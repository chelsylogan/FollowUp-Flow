import { db, ensureSchema, isAuthed, rowsToObjects } from '../../_lib.js';

export default async function handler(req, res) {
  if (!isAuthed(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await ensureSchema();
    const result = await db.execute('SELECT * FROM submissions ORDER BY created_at DESC');
    return res.json(rowsToObjects(result));
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Failed to fetch leads' });
  }
}
