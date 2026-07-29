module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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
      return res.status(200).json(null);
    }

    const data = await kv.get('portfolio-data');
    if (data) {
      return res.status(200).json(data);
    }
    return res.status(200).json(null);
  } catch (err) {
    console.error('KV read error:', err.message);
    return res.status(200).json(null);
  }
};
