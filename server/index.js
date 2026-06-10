const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Database = require('better-sqlite3');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Database setup
const db = new Database(path.join(__dirname, 'leads.db'));

// Initialize database with full schema
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    business_name TEXT,
    website TEXT,
    industry TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    contact_method TEXT,
    uses_crm TEXT,
    asks_reviews TEXT,
    biggest_challenge TEXT,
    monthly_inquiries TEXT,
    preferred_contact TEXT,
    status TEXT DEFAULT 'New',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FollowUp Flow API is running' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
