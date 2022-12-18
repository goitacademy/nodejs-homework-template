const jwt = require("jsonwebtoken");

require("dotenv").config();

const { JWT_SECRET_KEY } = process.env;

async function generateJWT(payload) {
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });
  return token;
}

module.exports = generateJWT;
