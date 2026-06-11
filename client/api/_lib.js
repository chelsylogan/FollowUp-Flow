// Shared helpers for the FollowUp Flow serverless API (Vercel + Turso).
// Files/folders prefixed with "_" are NOT turned into routes by Vercel.
import { createClient } from '@libsql/client/web';
import { createHash } from 'node:crypto';

// Create the Turso client lazily on first use. Doing this at module load
// would throw on a missing/invalid TURSO_DATABASE_URL and crash every
// function that imports this file (even ones that never query the DB).
let _client;
function getClient() {
  if (!_client) {
    const url = process.env.TURSO_DATABASE_URL;
    if (!url) {
      throw new Error('TURSO_DATABASE_URL environment variable is not set');
    }
    _client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
  }
  return _client;
}

// Thin wrapper so callers can keep using `db.execute(...)` unchanged while
// initialization stays lazy.
export const db = {
  execute: (...args) => getClient().execute(...args),
  batch: (...args) => getClient().batch(...args),
};

// Lazily create the table once per cold start. A fresh Turso DB needs no
// manual migration step this way.
let schemaReady;
export function ensureSchema() {
  if (!schemaReady) {
    schemaReady = db
      .execute(`
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
      `)
      .catch((err) => {
        // Don't cache a failed init — let the next request retry.
        schemaReady = undefined;
        throw err;
      });
  }
  return schemaReady;
}

// The admin bearer token is derived from the password, so it is a secret
// hash rather than a publicly-known literal string. Returns null when no
// password is configured (admin then fails closed).
export function adminToken() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHash('sha256').update(`followupflow:${pw}`).digest('hex');
}

export function isAuthed(req) {
  const token = adminToken();
  return Boolean(token) && req.headers.authorization === `Bearer ${token}`;
}

// Vercel parses JSON bodies automatically, but guard for string/empty bodies.
export function readBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

// Normalize libsql result rows into plain objects keyed by column name.
export function rowsToObjects(result) {
  return result.rows.map((row) =>
    Object.fromEntries(result.columns.map((col, i) => [col, row[i]]))
  );
}
