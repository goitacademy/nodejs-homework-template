require("dotenv").config();

const { DB_HOST, PORT } = process.env;

module.exports = {
  port: PORT,
  dbHost: DB_HOST,
};
