// check-db.js
require('dotenv').config();
const url = process.env.DATABASE_URL;
console.log('DATABASE_URL type:', typeof url);
try {
  const u = new URL(url);
  console.log('DB host:', u.hostname);
  console.log('DB name:', u.pathname.replace(/^\//, ''));
  console.log('Password present:', u.password ? 'yes' : 'no');
  console.log('Password length (not value):', u.password ? u.password.length : 0);
} catch (e) {
  console.log('DATABASE_URL parse error:', e.message);
}
