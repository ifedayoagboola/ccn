import { NextRequest, NextResponse } from 'next/server';

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
    )?.value || transaction.customer?.first_name || '';

    if (!email) {
      return NextResponse.json(
        { error: 'Customer email not found in transaction' },
        { status: 400 }
      );
    }

    // Add user to Slack community
    try {
      await addUserToSlack(email, name);
    } catch (slackError) {
      console.error('Failed to add user to Slack:', slackError);
      // Continue even if Slack fails - payment was successful
    }

    // Store payment record in database (optional - you can add Supabase integration here)
    // await storePaymentRecord(transaction);

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

