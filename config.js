const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  DB_HOST: process.env.DB_HOST,
  SECRET_KEY: process.env.SECRET_KEY,
};
