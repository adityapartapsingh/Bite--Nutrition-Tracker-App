require('dotenv').config();

const app = require('./app');
const { port } = require('./config');

const serverUrl = process.env.RENDER_EXTERNAL_URL || process.env.PUBLIC_URL || `http://localhost:${port}`;

app.listen(port, () => {
  console.log(`Bite backend listening on ${serverUrl}`);

  // Self-ping every 14 minutes to keep backend live
  setInterval(async () => {
    try {
      const res = await fetch(`${serverUrl}/ping`);
      console.log(`[Self-Ping] Sent to ${serverUrl} - Status: ${res.status}`);
    } catch (err) {
      console.error(`[Self-Ping] Error:`, err.message);
    }
  }, 14 * 60 * 1000); // 14 minutes
});
