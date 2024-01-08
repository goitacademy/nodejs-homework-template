const serverConfig = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES,
};

module.exports = serverConfig;
