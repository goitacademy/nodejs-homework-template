const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  serverPort: process.env.PORT || 3000,
  mongoConnectionSitring: process.env.MONGO_CONNECTION_STRING,
};
