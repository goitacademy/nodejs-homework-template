require('dotenv').config();

const { DB_HOST } = process.env;

module.exports = {
  dbHost: DB_HOST,
}