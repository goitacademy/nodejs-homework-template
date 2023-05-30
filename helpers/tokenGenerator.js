const jwt = require("jsonwebtoken");

function tokenGenerator(id) {
  const { SECRET_KEY } = process.env;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
  return token;
}

module.exports = tokenGenerator;
