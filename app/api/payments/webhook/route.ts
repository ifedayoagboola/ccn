import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

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
        await handleSuccessfulPayment(event.data);
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
  )?.value || data.customer?.first_name || '';

  if (!email) {
    console.error('No email found in payment data');
    return;
  }

  try {
    await addUserToSlack(email, name);
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

