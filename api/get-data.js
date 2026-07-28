import { kv } from '@vercel/kv';

export default async function handler(req, res) {
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
    return res.status(500).json({ error: 'Failed to read data' });
  }
}

export const config = {
  runtime: 'edge',
};
