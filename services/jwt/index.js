const jsonwebtoken = require("jsonwebtoken");

const { JWT_SECRET: jwtSecret } = process.env;

function createAccessToken(payload) {
  return jsonwebtoken.sign(payload, jwtSecret);
}

function verifyToken(token) {
  return jsonwebtoken.verify(token, jwtSecret);
}

module.exports = {
  createAccessToken,
  verifyToken,
};
