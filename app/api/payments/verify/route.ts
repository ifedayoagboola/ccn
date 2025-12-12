import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

/**
 * API Route: Verify Paystack Payment
 * 
 * This endpoint verifies a payment transaction with Paystack
 * and handles post-payment actions (e.g., adding user to Slack).
 */

// Force dynamic rendering - this route uses searchParams
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json(
        { error: 'Payment reference is required' },
        { status: 400 }
      );
    }

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecretKey) {
      return NextResponse.json(
        { error: 'Paystack secret key not configured' },
        { status: 500 }
      );
    }

    // Verify transaction with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${paystackSecretKey}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      return NextResponse.json(
        { error: data.message || 'Payment verification failed' },
        { status: response.status }
      );
    }

    const transaction = data.data;

    // Check if payment was successful
    if (transaction.status !== 'success') {
      return NextResponse.json(
        { error: 'Payment was not successful', transaction },
        { status: 400 }
      );
    }

    // Extract customer information
    const email = transaction.customer?.email;
    const name = transaction.metadata?.custom_fields?.find(
      (field: any) => field.variable_name === 'full_name'
    )?.value || transaction.customer?.first_name || transaction.customer?.last_name || 'Customer';

    if (!email) {
      return NextResponse.json(
        { error: 'Customer email not found in transaction' },
        { status: 400 }
      );
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
      console.error('Supabase configuration missing - cannot register member');
      return NextResponse.json(
        { error: 'Server configuration error - member registration failed' },
        { status: 500 }
      );
    }

    try {
      const supabase = createClient<Database>(supabaseUrl, supabaseKey);
      const normalizedEmail = String(email).trim().toLowerCase();
      const paymentRef = transaction.reference;

      // Check if member already exists by payment reference or email
      const { data: existingMember } = await (supabase
        .from('members') as any)
        .select('id, email, payment_reference')
        .or(`payment_reference.eq.${paymentRef},email.eq.${normalizedEmail}`)
        .single();

      if (existingMember) {
        // Member already exists - verify it's the same transaction
        if (existingMember.payment_reference === paymentRef) {
          console.log(`Member ${normalizedEmail} already registered with payment reference ${paymentRef}`);
        } else {
          // Same email but different payment reference - update with new payment
          const { error: updateError, data: updatedMember } = await (supabase
            .from('members') as any)
            .update({
              name: finalName, // Update name in case it changed
              payment_reference: paymentRef,
              payment_amount: transaction.amount / 100,
              payment_currency: transaction.currency || 'NGN',
              payment_status: 'success',
              membership_status: 'active',
            })
            .eq('email', normalizedEmail)
            .select()
            .single();

          if (updateError) {
            console.error('Failed to update existing member:', updateError);
            throw new Error(`Database update failed: ${updateError.message}`);
          }

          if (!updatedMember) {
            throw new Error('Member update returned no data');
          }

          console.log(`Updated existing member ${normalizedEmail} with new payment reference ${paymentRef}`);
        }
      } else {
        // Insert new member
        const { error: insertError, data: newMember } = await (supabase
          .from('members') as any)
          .insert({
            name: finalName,
            email: normalizedEmail,
            payment_reference: paymentRef,
            payment_amount: transaction.amount / 100, // Convert from kobo to Naira
            payment_currency: transaction.currency || 'NGN',
            payment_status: 'success',
            membership_status: 'active',
          })
          .select()
          .single();

        if (insertError) {
          console.error('Failed to save member to database:', insertError);
          throw new Error(`Database insert failed: ${insertError.message}`);
        }

        if (!newMember) {
          throw new Error('Member insert returned no data - registration may have failed');
        }

        console.log(`Successfully registered new member: ${normalizedEmail} (ID: ${newMember.id})`);
      }
    } catch (dbError: any) {
      console.error('Database registration error:', dbError);
      // Return error - member registration is critical
      return NextResponse.json(
        { 
          error: 'Payment verified but member registration failed',
          details: dbError.message || 'Unknown database error',
          transaction: {
            reference: transaction.reference,
            email,
            name,
          }
        },
        { status: 500 }
      );
    }

    // Add user to Slack community
    try {
      await addUserToSlack(email, name);
      
      // Update Slack invite status in database
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
    } catch (slackError) {
      console.error('Failed to add user to Slack:', slackError);
      // Continue even if Slack fails - payment was successful
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      transaction: {
        reference: transaction.reference,
        amount: transaction.amount / 100, // Convert from kobo to Naira
        status: transaction.status,
        email,
        name,
      },
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Add user to Slack community
 * 
 * This function uses Slack's API to invite a user to the workspace.
 * You'll need to set up a Slack app with the appropriate permissions.
 */
async function addUserToSlack(email: string, name: string) {
  const slackToken = process.env.SLACK_BOT_TOKEN;
  const slackWorkspaceId = process.env.SLACK_WORKSPACE_ID;

  if (!slackToken || !slackWorkspaceId) {
    console.warn('Slack credentials not configured. Skipping Slack invitation.');
    return;
  }

  try {
    // Option 1: Invite user via Slack API (requires admin permissions)
    const response = await fetch('https://slack.com/api/users.admin.invite', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${slackToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        first_name: name.split(' ')[0] || name,
        channels: process.env.SLACK_DEFAULT_CHANNEL || '', // Optional: specific channel
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.error || 'Failed to invite user to Slack');
    }

    console.log(`Successfully invited ${email} to Slack`);
  } catch (error) {
    // If direct invite fails, you can use Slack webhook to notify admins
    // or use a different Slack integration method
    console.error('Slack invitation error:', error);
    throw error;
  }
}

