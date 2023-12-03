// utils/variables.js
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const CONNECTION_MONGODB = process.env.CONNECTION_MONGODB;
const USEREMAIL = process.env.USEREMAIL;
const USERPASSWORD = process.env.USERPASSWORD;
const SECRET_KEY = process.env.SECRET_KEY;
const EMAIL_SEND = process.env.EMAIL_SEND;
const PASSWORD_SEND = process.env.PASSWORD_SEND;

module.exports = {
  PORT,
  CONNECTION_MONGODB,
  USEREMAIL,
  USERPASSWORD,
  SECRET_KEY,
  EMAIL_SEND,
  PASSWORD_SEND,
};
