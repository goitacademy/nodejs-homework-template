const app = require('./app');
require('dotenv').config();

const MAIN_PORT = process.env.MAIN_PORT;

app.listen(MAIN_PORT, () => {
  console.log(`Server running. Use our API on port: ${MAIN_PORT}`)
});