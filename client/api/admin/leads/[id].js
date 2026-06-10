import { db, ensureSchema, isAuthed, readBody } from '../../_lib.js';

export default async function handler(req, res) {
  if (!isAuthed(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const { status, notes } = readBody(req);

  try {
    await ensureSchema();
    if (status !== undefined && notes !== undefined) {
      await db.execute({
        sql: 'UPDATE submissions SET status = ?, notes = ? WHERE id = ?',
        args: [status, notes, id],
      });
    } else if (status !== undefined) {
      await db.execute({
        sql: 'UPDATE submissions SET status = ? WHERE id = ?',
        args: [status, id],
      });
    } else if (notes !== undefined) {
      await db.execute({
        sql: 'UPDATE submissions SET notes = ? WHERE id = ?',
        args: [notes, id],
      });
    }
    return res.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Failed to update lead' });
  }
}
