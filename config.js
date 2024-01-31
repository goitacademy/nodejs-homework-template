const dotenv = require("dotenv");

dotenv.config();

console.log("mongoConnectionString:", process.env.MONGO_CONNECTION_STRING);

module.exports = {
  serverPort: process.env.PORT || 3000,
  mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
};
