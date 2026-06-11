// TEMPORARY cleanup endpoint — removed in the very next commit.
// Deletes only the automated test row and reports the remaining count.
import { db } from './_lib.js';

export default async function handler(req, res) {
  let deleted = null;
  let remaining = null;
  let error = null;
  try {
    const del = await db.execute({
      sql: 'DELETE FROM submissions WHERE business_name = ?',
      args: ['DELETE ME test'],
    });
    deleted = del.rowsAffected;
    const cnt = await db.execute('SELECT COUNT(*) AS n FROM submissions');
    remaining = Number(cnt.rows[0][0]);
  } catch (e) {
    error = String(e?.message || e);
  }
  res.json({ version: 'diag-4-cleanup', deleted, remaining, error });
}
