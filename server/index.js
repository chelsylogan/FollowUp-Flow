const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Database = require('better-sqlite3');
const path = require('path');
const { stringify } = require('csv-stringify/sync');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Database setup
const db = new Database(path.join(__dirname, 'leads.db'));

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    business_name TEXT NOT NULL,
    website TEXT,
    industry TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    contact_method TEXT,
    uses_crm TEXT,
    asks_reviews TEXT,
    biggest_challenge TEXT,
    monthly_inquiries TEXT,
    preferred_contact TEXT,
    status TEXT DEFAULT 'New',
    notes TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Auth Middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === 'Bearer admin-token') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FollowUp Flow API is running' });
});

// Submit audit form
app.post('/api/submissions', (req, res) => {
  const {
    name, business_name, website, industry, email, phone,
    contact_method, uses_crm, asks_reviews, biggest_challenge,
    monthly_inquiries, preferred_contact
  } = req.body;

  // Basic validation
  if (!name || !business_name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO submissions (
        name, business_name, website, industry, email, phone,
        contact_method, uses_crm, asks_reviews, biggest_challenge,
        monthly_inquiries, preferred_contact
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name, business_name, website, industry, email, phone,
      contact_method, uses_crm, asks_reviews, biggest_challenge,
      monthly_inquiries, preferred_contact
    );

    res.status(201).json({ success: true, leadId: result.lastInsertRowid });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'followupflow2024';

  if (password === adminPassword) {
    res.json({ success: true, token: 'admin-token' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid password' });
  }
});

// Get all leads
app.get('/api/admin/leads', authenticateAdmin, (req, res) => {
  try {
    const leads = db.prepare('SELECT * FROM submissions ORDER BY created_at DESC').all();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// Update lead status/notes
app.put('/api/admin/leads/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  try {
    if (status !== undefined && notes !== undefined) {
      db.prepare('UPDATE submissions SET status = ?, notes = ? WHERE id = ?').run(status, notes, id);
    } else if (status !== undefined) {
      db.prepare('UPDATE submissions SET status = ? WHERE id = ?').run(status, id);
    } else if (notes !== undefined) {
      db.prepare('UPDATE submissions SET notes = ? WHERE id = ?').run(notes, id);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// Export CSV
app.get('/api/admin/leads/export', authenticateAdmin, (req, res) => {
  try {
    const leads = db.prepare('SELECT * FROM submissions ORDER BY created_at DESC').all();
    const csv = stringify(leads, { header: true });
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export CSV' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
