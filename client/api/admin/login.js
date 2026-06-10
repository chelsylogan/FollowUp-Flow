import { adminToken, readBody } from '../_lib.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = readBody(req);
  const expected = process.env.ADMIN_PASSWORD;

  // Fail closed: without a configured password the admin area is unreachable,
  // rather than falling back to a guessable default.
  if (!expected) {
    return res.status(503).json({
      success: false,
      error: 'Admin login is not configured. Set the ADMIN_PASSWORD environment variable.',
    });
  }

  if (password && password === expected) {
    return res.json({ success: true, token: adminToken() });
  }
  return res.status(401).json({ success: false, error: 'Invalid password' });
}
