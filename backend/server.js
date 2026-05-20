require('dotenv').config();

const app = require('./app');
const { port } = require('./config');

app.listen(port, () => {
  console.log(`Bite backend listening on http://localhost:${port}`);

  // Self-ping every 14 minutes to keep backend live
  setInterval(async () => {
    try {
      const url = process.env.RENDER_EXTERNAL_URL || process.env.PUBLIC_URL || `http://localhost:${port}`;
      const res = await fetch(`${url}/ping`);
      console.log(`[Self-Ping] Sent to ${url} - Status: ${res.status}`);
    } catch (err) {
      console.error(`[Self-Ping] Error:`, err.message);
    }
  }, 14 * 60 * 1000); // 14 minutes
});
