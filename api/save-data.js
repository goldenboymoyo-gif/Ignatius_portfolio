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

    let kv;
    try {
      kv = require('@vercel/kv').kv;
    } catch (e1) {
      try {
        const { Redis } = require('@upstash/redis');
        const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
        const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
        if (url && token) {
          kv = new Redis({ url, token });
        } else {
          const singleUrl = process.env.KV_URL || process.env.UPSTASH_REDIS_URL;
          if (singleUrl) {
            kv = new Redis({ url: singleUrl });
          }
        }
      } catch (e2) {}
    }

    if (!kv) {
      console.warn('Redis/KV not configured');
      return res.status(200).json({ ok: true, warning: 'Redis not configured' });
    }

    await kv.set('portfolio-data', body);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('KV save error:', err.message);
    return res.status(200).json({ ok: true, warning: 'Saved but KV sync failed: ' + err.message });
  }
};
