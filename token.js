const jwt = require("jsonwebtoken");

const generateToken = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: 120_000_000 },
      (err, token) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      }
    );
  });

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: "HS256" },
      (err, payload) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(payload);
      }
    );
  });

module.exports = {
  generateToken,
  verifyToken,
};
