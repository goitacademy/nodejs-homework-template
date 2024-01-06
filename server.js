// server.js
const app = require('./app');
require('colors');
const { join } = require('path');
const connectDb = require('./config/connectDb');

const configPath = join(__dirname, 'config', '.env');
require('dotenv').config({ path: configPath });

console.log('Connection String:', process.env.CONNECTION);

connectDb().then(() => {
  const { PORT } = process.env;

  app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running on port ${PORT}`.magenta.italic);
  });
});

