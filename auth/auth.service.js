const JWT = require("jsonwebtoken");
const { jwtSecret, jwtLifetime } = require("../config");

const generateAccessToken = (user) => {
  return JWT.sign(user, jwtSecret, { expiresIn: jwtLifetime ?? "1h" });
};

const verifyToken = (token) => {
  try {
    return JWT.verify(token, jwtSecret);
  } catch (e) {
    console.error(e);

    if (e instanceof JWT.TokenExpiredError) {
      throw new Error("Token expired.");
    }

    if (e instanceof JWT.JsonWebTokenError) {
      throw new Error("Token is invalid.");
    }

    throw new Error("Unknown token verification error.");
  }
};

module.exports = {
  generateAccessToken,
  verifyToken,
};
