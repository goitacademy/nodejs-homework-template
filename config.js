const dotenv = require('dotenv');
dotenv.config();

const config = {
  mongo_config: { MONGO_URI: process.env.MONGO_URI },
};

module.exports = config;
