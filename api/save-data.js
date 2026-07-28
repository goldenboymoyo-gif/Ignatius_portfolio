const { kv } = require('@vercel/kv');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const raw = Buffer.concat(chunks).toString();
    const body = JSON.parse(raw);

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
    console.error('KV save error:', err.message);
    return res.status(500).json({ error: 'Failed to save data', detail: err.message });
  }
};
