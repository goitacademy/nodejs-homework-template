require("dotenv").config();

const config = {
  PORT: process.env.PORT || 3000,
  HOST_DB: process.env.HOST_DB,
  SECRET_KEY: process.env.SECRET_KEY,
};

module.exports = config;
