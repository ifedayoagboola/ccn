/**
 * Script to run the partnerships table migration
 * 
 * Usage: node scripts/run-migration.js
 * 
 * Make sure you have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 * in your .env.local file, or set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Get Supabase credentials
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Supabase credentials not found!');
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment');
  console.error('Or set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

// Read the migration file
const migrationPath = path.join(__dirname, '../supabase/migrations/create_partnerships_table.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

async function runMigration() {
  console.log('🚀 Starting migration...');
  console.log('📝 Reading migration file:', migrationPath);

  try {
    // Create Supabase client with service role key for admin operations
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Split SQL into individual statements (simple approach)
    // Note: This is a basic implementation. For production, use Supabase CLI or proper migration tool
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📊 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      console.log(`\n⏳ Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        const { data, error } = await supabase.rpc('exec_sql', { sql: statement });
        
        if (error) {
          // Try direct query if RPC doesn't work
          console.log('⚠️  RPC method not available, trying alternative approach...');
          // For now, we'll just log - you'll need to run this in Supabase dashboard
          console.log('❌ Cannot execute SQL directly via client.');
          console.log('📋 Please copy the SQL from supabase/migrations/create_partnerships_table.sql');
          console.log('   and run it in your Supabase SQL Editor.');
          process.exit(1);
        }
      } catch (err) {
        console.error('❌ Error executing statement:', err.message);
        console.log('\n📋 Alternative: Please copy the SQL from supabase/migrations/create_partnerships_table.sql');
        console.log('   and run it in your Supabase SQL Editor at:');
        console.log(`   ${supabaseUrl.replace('/rest/v1', '')}/project/_/sql`);
        process.exit(1);
      }
    }

    console.log('\n✅ Migration completed successfully!');
    console.log('🎉 The partnerships table has been created.');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.log('\n📋 Please run the SQL manually in Supabase SQL Editor:');
    console.log('   1. Go to your Supabase project dashboard');
    console.log('   2. Navigate to SQL Editor');
    console.log('   3. Copy the contents of supabase/migrations/create_partnerships_table.sql');
    console.log('   4. Paste and run it');
    process.exit(1);
  }
}

runMigration();

