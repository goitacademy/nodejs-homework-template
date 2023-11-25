const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  serverPort: process.env.PORT || 3000,
  mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
  jwtSecret: process.env.JWT_SECRET,
  jwtLifetime: process.env.JWT_LIFETIME,
  gmailUser: process.env.GMAIL_USER,
  gmailPassword: process.env.GMAIL_PASSWORD,
};
