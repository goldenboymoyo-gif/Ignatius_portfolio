import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = await req.json();

    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: 'Invalid data' });
    }

    if (body._password !== 'crsmedia2026') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    delete body._password;

    await kv.set('portfolio-data', body);

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save data' });
  }
}

export const config = {
  runtime: 'edge',
};
