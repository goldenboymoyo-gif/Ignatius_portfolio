const { kv } = require('@vercel/kv');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = await kv.get('portfolio-data');
    if (data) {
      return res.status(200).json(data);
    }
    return res.status(200).json(null);
  } catch (err) {
    console.error('KV read error:', err.message);
    return res.status(500).json({ error: 'Failed to read data', detail: err.message });
  }
};
