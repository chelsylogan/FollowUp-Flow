// TEMPORARY diagnostic endpoint — remove before considering this production-ready.
// Reports whether the required env vars are present (without leaking secret
// values) and whether the Turso connection works.
import { db } from './_lib.js';

export default async function handler(req, res) {
  const url = process.env.TURSO_DATABASE_URL || '';
  const env = {
    TURSO_DATABASE_URL_set: Boolean(process.env.TURSO_DATABASE_URL),
    TURSO_DATABASE_URL_scheme: url ? url.split('://')[0] : null,
    TURSO_AUTH_TOKEN_set: Boolean(process.env.TURSO_AUTH_TOKEN),
    ADMIN_PASSWORD_set: Boolean(process.env.ADMIN_PASSWORD),
  };

  let dbTest;
  try {
    const r = await db.execute('SELECT 1 AS ok');
    dbTest = { ok: true, rows: r.rows.length };
  } catch (e) {
    dbTest = { ok: false, error: String(e?.message || e) };
  }

  res.json({ version: 'diag-3', env, dbTest });
}
