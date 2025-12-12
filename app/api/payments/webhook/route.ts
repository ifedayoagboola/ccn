import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

/**
 * API Route: Paystack Webhook Handler
 * 
 * This endpoint receives webhook events from Paystack
 * to handle payment events asynchronously.
 * 
 * Paystack will send events like:
 * - charge.success
 * - charge.failed
 * - transfer.success
 */

// Force dynamic rendering - this route handles webhook events
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      );
    }

    // Verify webhook signature
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecretKey) {
      return NextResponse.json(
        { error: 'Paystack secret key not configured' },
        { status: 500 }
      );
    }

    const hash = crypto
      .createHmac('sha512', paystackSecretKey)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const event = JSON.parse(body);

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        try {
          await handleSuccessfulPayment(event.data);
        } catch (error: any) {
          console.error('Error handling successful payment:', error);
          // Return error so Paystack can retry if needed
          return NextResponse.json(
            { error: 'Failed to process payment', details: error.message },
            { status: 500 }
          );
        }
        break;
      case 'charge.failed':
        await handleFailedPayment(event.data);
        break;
      default:
        console.log(`Unhandled event type: ${event.event}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(data: any) {
  const email = data.customer?.email;
  const name = data.metadata?.custom_fields?.find(
    (field: any) => field.variable_name === 'full_name'
  )?.value || data.customer?.first_name || data.customer?.last_name || 'Customer';

  if (!email) {
    console.error('No email found in payment data');
    throw new Error('Customer email not found in payment data');
  }

  // Validate name - ensure it meets database constraints (min 2 characters)
  const trimmedName = String(name).trim();
  let finalName: string;
  if (trimmedName.length < 2) {
    console.warn(`Name too short (${trimmedName.length} chars), using email as fallback`);
    // Use email username part as fallback if name is invalid
    const emailUsername = email.split('@')[0] || 'Customer';
    finalName = emailUsername.length >= 2 ? emailUsername : 'Customer';
  } else {
    finalName = trimmedName;
  }

  // Store paid user in database
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase configuration missing - cannot register member from webhook');
    throw new Error('Supabase configuration missing');
  }

  try {
    const supabase = createClient<Database>(supabaseUrl, supabaseKey);
    const normalizedEmail = String(email).trim().toLowerCase();
    const paymentRef = data.reference;

    // Check if member already exists by payment reference or email
    const { data: existingMember } = await (supabase
      .from('members') as any)
      .select('id, email, payment_reference')
      .or(`payment_reference.eq.${paymentRef},email.eq.${normalizedEmail}`)
      .single();

    if (existingMember) {
      // Member already exists - verify it's the same transaction
      if (existingMember.payment_reference === paymentRef) {
        console.log(`Member ${normalizedEmail} already registered with payment reference ${paymentRef} (webhook)`);
      } else {
        // Same email but different payment reference - update with new payment
        const { error: updateError, data: updatedMember } = await (supabase
          .from('members') as any)
          .update({
            name: finalName, // Update name in case it changed
            payment_reference: paymentRef,
            payment_amount: data.amount / 100,
            payment_currency: data.currency || 'NGN',
            payment_status: 'success',
            membership_status: 'active',
          })
          .eq('email', normalizedEmail)
          .select()
          .single();

        if (updateError) {
          console.error('Failed to update existing member from webhook:', updateError);
          throw new Error(`Database update failed: ${updateError.message}`);
        }

        if (!updatedMember) {
          throw new Error('Member update returned no data');
        }

        console.log(`Updated existing member ${normalizedEmail} with new payment reference ${paymentRef} (webhook)`);
      }
    } else {
      // Insert new member
      const { error: insertError, data: newMember } = await (supabase
        .from('members') as any)
        .insert({
          name: finalName,
          email: normalizedEmail,
          payment_reference: paymentRef,
          payment_amount: data.amount / 100, // Convert from kobo to Naira
          payment_currency: data.currency || 'NGN',
          payment_status: 'success',
          membership_status: 'active',
        })
        .select()
        .single();

      if (insertError) {
        console.error('Failed to save member to database from webhook:', insertError);
        throw new Error(`Database insert failed: ${insertError.message}`);
      }

      if (!newMember) {
        throw new Error('Member insert returned no data - registration may have failed');
      }

      console.log(`Successfully registered new member from webhook: ${normalizedEmail} (ID: ${newMember.id})`);
    }
  } catch (dbError: any) {
    console.error('Database registration error in webhook:', dbError);
    // Re-throw to allow webhook handler to retry if needed
    throw new Error(`Member registration failed: ${dbError.message || 'Unknown database error'}`);
  }

  try {
    await addUserToSlack(email, name);
    
    // Update Slack invite status
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient<Database>(supabaseUrl, supabaseKey);
      await (supabase
        .from('members') as any)
        .update({
          slack_invited: true,
          slack_invite_sent_at: new Date().toISOString(),
        })
        .eq('email', email.toLowerCase());
    }
    
    console.log(`Successfully processed payment for ${email}`);
  } catch (error) {
    console.error('Failed to process successful payment:', error);
  }
}

async function handleFailedPayment(data: any) {
  console.log(`Payment failed for transaction: ${data.reference}`);
  // You can add logic here to notify the user or update your database
}

async function addUserToSlack(email: string, name: string) {
  const slackToken = process.env.SLACK_BOT_TOKEN;
  const slackWorkspaceId = process.env.SLACK_WORKSPACE_ID;

  if (!slackToken || !slackWorkspaceId) {
    console.warn('Slack credentials not configured. Skipping Slack invitation.');
    return;
  }

  try {
    const response = await fetch('https://slack.com/api/users.admin.invite', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${slackToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        first_name: name.split(' ')[0] || name,
        channels: process.env.SLACK_DEFAULT_CHANNEL || '',
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.error || 'Failed to invite user to Slack');
    }

    console.log(`Successfully invited ${email} to Slack`);
  } catch (error) {
    console.error('Slack invitation error:', error);
    throw error;
  }
}

