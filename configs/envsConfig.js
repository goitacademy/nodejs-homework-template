require("dotenv").config();

const { DB_HOST, PORT, JWT_SECRET } = process.env;

module.exports = {
  port: PORT,
  dbHost: DB_HOST,
  jwtSecret: JWT_SECRET,
};
