require("dotenv").config();

const config = {
  PORT: process.env.PORT || 3000,
  HOST_DB: process.env.HOST_DB,
};

module.exports = config;