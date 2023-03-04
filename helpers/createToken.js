const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const createTokens = (id) => {
  const payload = { id };
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "24h",
  });

  return { accessToken, refreshToken };
};

module.exports = createTokens;
