/**
 * Simple script to print the migration SQL
 * Usage: node scripts/print-migration.js
 */

const fs = require('fs');
const path = require('path');

const migrationPath = path.join(__dirname, '../supabase/migrations/create_partnerships_table.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

console.log('='.repeat(80));
console.log('PARTNERSHIP TABLE MIGRATION SQL');
console.log('='.repeat(80));
console.log('\n');
console.log(migrationSQL);
console.log('\n');
console.log('='.repeat(80));
console.log('Copy the SQL above and run it in your Supabase SQL Editor');
console.log('='.repeat(80));

