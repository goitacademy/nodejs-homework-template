const JWT = require("jsonwebtoken");
const { jwtSecret, jwtLifetime } = require("../config");

const generateAccessToken = (user) =>
  JWT.sign(user, jwtSecret, { expiresIn: jwtLifetime ?? "1h" });

const verifyToken = (token) => {
  try {
    const verifyResult = JWT.verify(token, jwtSecret);
    return verifyResult;
  } catch (e) {
    console.error(e);

    if (e instanceof JWT.TokenExpiredError) {
      throw new Error("Not authorized");
    }

    if (e instanceof JWT.JsonWebTokenError) {
      throw new Error("Not authorized");
    }

    throw new Error("Unknown token verification error.");
  }
};

module.exports = {
  generateAccessToken,
  verifyToken,
};
