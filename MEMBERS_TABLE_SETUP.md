# Members Table Setup Guide

This guide will help you create the `members` table in your Supabase database.

## Option 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Copy and Run the Migration**
   - Open the file: `supabase/migrations/create_members_table.sql`
   - Copy the entire contents
   - Paste it into the SQL Editor
   - Click "Run" or press `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

4. **Verify the Table was Created**
   - Go to "Table Editor" in the left sidebar
   - You should see the `members` table listed
   - Click on it to view the structure

## Option 2: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Make sure you're in the project root
cd C:\Users\user\Projects\CCN

# Link to your Supabase project (if not already linked)
supabase link --project-ref your-project-ref

# Run the migration
supabase db push
```

## Table Structure

The `members` table includes:

- **User Information**: `name`, `email`
- **Payment Information**: `payment_reference`, `payment_amount`, `payment_currency`, `payment_status`
- **Membership Status**: `membership_status`, `joined_at`
- **Slack Integration**: `slack_invited`, `slack_invite_sent_at`
- **Audit Fields**: `created_at`, `updated_at`

## Row Level Security (RLS)

The table has RLS enabled with the following policies:

- **Insert**: Service role and authenticated users can insert
- **Select**: Only authenticated users can read
- **Update**: Only authenticated users can update

## Verification

After creating the table, verify it works by checking:

1. The table appears in Supabase Table Editor
2. The indexes are created (check in Database > Indexes)
3. The RLS policies are active (check in Authentication > Policies)

## Troubleshooting

If you encounter errors:

1. **Function already exists**: The `update_updated_at_column()` function might already exist from the partnerships table. This is fine - the `CREATE OR REPLACE` will handle it.

2. **Permission errors**: Make sure you're using the service role key or have proper permissions.

3. **Table already exists**: If the table already exists but is empty, you can drop it first:
   ```sql
   DROP TABLE IF EXISTS public.members CASCADE;
   ```
   Then run the migration again.

## Next Steps

After creating the table:

1. Test the payment flow to ensure members are being saved
2. Check the table after a successful payment
3. Verify that duplicate payments are handled correctly

