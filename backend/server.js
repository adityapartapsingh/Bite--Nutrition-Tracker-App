require('dotenv').config();

const app = require('./app');
const { port } = require('./config');

app.listen(port, () => {
  console.log(`Bite backend listening on http://localhost:${port}`);
});
