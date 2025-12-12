# Partnership Form Setup Guide

This document explains how to set up the partnership form submission system with Supabase.

## Database Setup

### 1. Run the Migration

Execute the SQL migration file to create the `partnerships` table in your Supabase database:

```bash
# Option 1: Using Supabase CLI
supabase db push

# Option 2: Copy and paste the SQL from supabase/migrations/create_partnerships_table.sql
# into your Supabase SQL Editor and run it
```

The migration creates:
- `partnerships` table with all necessary fields
- Indexes for optimal query performance
- Row Level Security (RLS) policies
- Automatic `updated_at` timestamp trigger

### 2. Verify Table Creation

After running the migration, verify the table was created:

```sql
SELECT * FROM partnerships LIMIT 1;
```

## Table Schema

The `partnerships` table includes:

### Required Fields
- `id` (UUID) - Primary key, auto-generated
- `name` (TEXT) - Contact person's full name
- `email` (TEXT) - Contact email address
- `organisation` (TEXT) - Organization/company name
- `need` (TEXT) - Description of partnership needs
- `status` (TEXT) - Current status (default: 'pending')

### Optional Fields
- `phone` (TEXT) - Contact phone number
- `website` (TEXT) - Organization website
- `partnership_type` (TEXT) - Type: 'hiring', 'collaboration', 'sponsorship', 'other'
- `expected_timeline` (TEXT) - Expected timeline for partnership
- `budget_range` (TEXT) - Budget range if applicable
- `additional_notes` (TEXT) - Additional information

### Admin Fields
- `admin_notes` (TEXT) - Internal notes for admin use
- `assigned_to` (UUID) - User ID of assigned admin

### Audit Fields
- `created_at` (TIMESTAMPTZ) - Auto-set on creation
- `updated_at` (TIMESTAMPTZ) - Auto-updated on modification

## Status Values

The `status` field can have the following values:
- `pending` - New submission, not yet reviewed
- `contacted` - Initial contact made
- `in_progress` - Partnership discussion ongoing
- `completed` - Partnership successfully established
- `declined` - Partnership request declined

## Security

### Row Level Security (RLS)

The table has RLS enabled with the following policies:

1. **Public Insert**: Anyone can submit partnership forms (anon, authenticated)
2. **Authenticated Read**: Only authenticated users can view submissions
3. **Authenticated Update**: Only authenticated users can update records
4. **Authenticated Delete**: Only authenticated users can delete records

### API Security Features

The API endpoint (`/api/partnerships/submit`) includes:

- **Input Validation**: Zod schema validation on both client and server
- **Rate Limiting**: 5 requests per minute per IP address
- **XSS Protection**: Input sanitization
- **Error Handling**: Comprehensive error messages without exposing sensitive data
- **Type Safety**: Full TypeScript support

## API Endpoint

### POST `/api/partnerships/submit`

Submit a partnership form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "organisation": "Example Corp",
  "need": "We are looking for remote nurses for our telehealth platform..."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Partnership request submitted successfully",
  "id": "uuid-here"
}
```

**Error Responses:**

- **400 Bad Request**: Validation errors
- **409 Conflict**: Duplicate entry
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server/database error

## Usage

The partnership form on `/partnerships` automatically submits to the API endpoint. No additional configuration needed.

## Admin Access

To view and manage partnership submissions:

1. Authenticate with Supabase
2. Query the `partnerships` table:

```sql
-- View all pending partnerships
SELECT * FROM partnerships 
WHERE status = 'pending' 
ORDER BY created_at DESC;

-- Update partnership status
UPDATE partnerships 
SET status = 'contacted', admin_notes = 'Followed up via email'
WHERE id = 'partnership-id-here';
```

## Future Enhancements

Consider adding:

1. **Email Notifications**: Send email to admins on new submissions
2. **Admin Dashboard**: UI for managing partnerships
3. **Advanced Rate Limiting**: Use Redis/Upstash for distributed rate limiting
4. **File Attachments**: Allow organizations to upload partnership proposals
5. **Integration**: Connect with CRM systems
6. **Analytics**: Track conversion rates and response times

## Troubleshooting

### Form submissions not saving

1. Check Supabase connection in `.env`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   ```

2. Verify RLS policies allow inserts:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'partnerships';
   ```

3. Check browser console and server logs for errors

### Rate limiting issues

The basic rate limiter uses in-memory storage. For production:
- Implement Redis-based rate limiting
- Use a service like Upstash
- Consider per-email rate limiting instead of IP-based

### Type errors

Run TypeScript type generation:
```bash
npx supabase gen types typescript --project-id your-project-id > types/supabase.ts
```

