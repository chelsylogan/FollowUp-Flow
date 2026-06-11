import { db, ensureSchema, readBody } from './_lib.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name, business_name, website, industry, email, phone,
    contact_method, uses_crm, asks_reviews, biggest_challenge,
    monthly_inquiries, preferred_contact,
  } = readBody(req);

  if (!name || !business_name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await ensureSchema();
    const result = await db.execute({
      sql: `
        INSERT INTO submissions (
          name, business_name, website, industry, email, phone,
          contact_method, uses_crm, asks_reviews, biggest_challenge,
          monthly_inquiries, preferred_contact
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      // libsql binds reject `undefined`; coerce optional fields to null.
      args: [
        name, business_name, website ?? null, industry ?? null, email, phone,
        contact_method ?? null, uses_crm ?? null, asks_reviews ?? null,
        biggest_challenge ?? null, monthly_inquiries ?? null, preferred_contact ?? null,
      ],
    });
    return res.status(201).json({ success: true, leadId: Number(result.lastInsertRowid) });
  } catch (error) {
    console.error('Database error:', error);
    // TEMPORARY: surface the underlying error to aid debugging the deploy.
    return res.status(500).json({ error: 'Failed to submit form', detail: String(error?.message || error) });
  }
}
