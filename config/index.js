require("dotenv").config();

const {SECRET, HOST_DB, PORT} = process.env;

module.exports = {
  SECRET,
  HOST_DB,
  PORT,
};
