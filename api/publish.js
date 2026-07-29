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

    if (body._password !== 'crsmedia2026') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = process.env.GITHUB_TOKEN || body._github_token;
    if (!token) {
      return res.status(400).json({ error: 'GitHub token required. Set GITHUB_TOKEN env var or provide _github_token' });
    }

    delete body._password;
    delete body._github_token;

    const owner = 'goldenboymoyo-gif';
    const repo = 'Ignatius_portfolio';
    const path = 'data.json';
    const content = Buffer.from(JSON.stringify(body, null, 2)).toString('base64');

    const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'ignatius-portfolio'
      }
    });

    let sha;
    if (getRes.ok) {
      const existing = await getRes.json();
      sha = existing.sha;
    }

    const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'ignatius-portfolio'
      },
      body: JSON.stringify({
        message: 'Update portfolio data via admin',
        content,
        sha,
        branch: 'master'
      })
    });

    if (putRes.ok) {
      return res.status(200).json({ ok: true });
    }

    const err = await putRes.json();
    console.error('GitHub API error:', err);
    return res.status(500).json({ error: 'Failed to publish', detail: err.message });
  } catch (err) {
    console.error('Publish error:', err.message);
    return res.status(500).json({ error: 'Failed to publish', detail: err.message });
  }
};