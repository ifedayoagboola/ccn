# Payment Integration Setup Guide

This document outlines the setup required for Paystack payment integration and Slack community invitation.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Paystack Configuration
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx  # Your Paystack secret key
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx  # Your Paystack public key

# Application URL (for payment callbacks)
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Change to your production URL in production

# Slack Integration (Optional - for automatic community invitations)
SLACK_BOT_TOKEN=xoxb-xxxxxxxxxxxxx  # Slack bot token with users:write permission
SLACK_WORKSPACE_ID=T00000000  # Your Slack workspace ID
SLACK_DEFAULT_CHANNEL=C00000000  # Optional: Default channel ID for new members
```

## Paystack Setup

### 1. Create a Paystack Account
- Sign up at [https://paystack.com](https://paystack.com)
- Complete your business verification

### 2. Get Your API Keys
1. Log in to your Paystack Dashboard
2. Go to **Settings** → **API Keys & Webhooks**
3. Copy your **Public Key** (starts with `pk_test_` for test mode, `pk_live_` for live mode)
4. Copy your **Secret Key** (starts with `sk_test_` for test mode, `sk_live_` for live mode)

### 3. Configure Webhook URL
1. In Paystack Dashboard, go to **Settings** → **API Keys & Webhooks**
2. Add a webhook URL: `https://yourdomain.com/api/payments/webhook`
3. Select events to listen for:
   - `charge.success`
   - `charge.failed`
4. Save the webhook

### 4. Test Mode vs Live Mode
- **Test Mode**: Use test keys (starts with `pk_test_` and `sk_test_`)
  - Test cards: https://paystack.com/docs/payments/test-payments
- **Live Mode**: Use live keys (starts with `pk_live_` and `sk_live_`)
  - Requires business verification

## Slack Integration Setup

### Option 1: Slack Bot Token (Recommended)

1. **Create a Slack App**:
   - Go to [https://api.slack.com/apps](https://api.slack.com/apps)
   - Click **Create New App** → **From scratch**
   - Name your app (e.g., "CCN Community Bot")
   - Select your workspace

2. **Configure OAuth & Permissions**:
   - Go to **OAuth & Permissions** in the sidebar
   - Add the following Bot Token Scopes:
     - `users:write` (to invite users)
     - `users:read.email` (to read user emails)
   - Scroll down and click **Install to Workspace**
   - Copy the **Bot User OAuth Token** (starts with `xoxb-`)

3. **Get Workspace ID**:
   - Go to **Basic Information** in the sidebar
   - Find your **Workspace ID** (starts with `T`)

4. **Optional: Set Default Channel**:
   - Right-click on a channel → **View channel details**
   - Copy the **Channel ID** (starts with `C`)

### Option 2: Slack Webhook (Alternative)

If you prefer not to use a bot token, you can:
1. Create a Slack Incoming Webhook
2. Modify the `addUserToSlack` function in the API routes to use webhook instead
3. Send a notification to admins who can manually invite users

## Payment Flow

1. **User clicks "Join the movement"** → Opens payment modal
2. **User enters name and email** → Submits form
3. **Server initializes payment** → `/api/payments/initialize` creates Paystack transaction
4. **Paystack popup opens** → User completes payment
5. **Payment callback** → Paystack redirects to `/api/payments/verify`
6. **Server verifies payment** → Confirms with Paystack API
7. **User added to Slack** → Automatic invitation sent
8. **Success message** → User sees confirmation

## Testing

### Test Payment Flow
1. Use Paystack test cards: https://paystack.com/docs/payments/test-payments
2. Example test card: `4084084084084081` (any future expiry, any CVV)
3. Use test email addresses

### Verify Webhook
1. Use Paystack's webhook testing tool in the dashboard
2. Or use a service like [ngrok](https://ngrok.com) to expose localhost for testing

## Security Considerations

1. **Never expose secret keys** in client-side code
2. **Always verify webhook signatures** (already implemented)
3. **Use HTTPS in production** for webhook endpoints
4. **Validate payment amounts** on the server side
5. **Store payment records** in your database for audit trail

## Troubleshooting

### Payment initialization fails
- Check that `PAYSTACK_SECRET_KEY` is set correctly
- Verify the key is for the correct environment (test vs live)
- Check network connectivity to Paystack API

### Payment verification fails
- Ensure webhook URL is accessible
- Check webhook signature verification
- Verify transaction reference exists in Paystack

### Slack invitation fails
- Verify `SLACK_BOT_TOKEN` has correct permissions
- Check that bot is installed in the workspace
- Ensure email format is valid

## Production Checklist

- [ ] Switch to live Paystack keys
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Configure production webhook URL in Paystack
- [ ] Test payment flow end-to-end
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Configure database to store payment records
- [ ] Set up email notifications for successful payments
- [ ] Test Slack invitation flow

## Support

For issues or questions:
- Paystack Documentation: https://paystack.com/docs
- Paystack Support: support@paystack.com
- Slack API Documentation: https://api.slack.com

