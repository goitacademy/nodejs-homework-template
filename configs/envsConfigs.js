require('dotenv').config();

const { DB_HOST, PORT } = process.env;

module.exports = {
  port: PORT,
  db_host: DB_HOST,
};
