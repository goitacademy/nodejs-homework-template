const serverConfig = {
  mongoURI: process.env.MONGO_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
};
module.exports = serverConfig;
