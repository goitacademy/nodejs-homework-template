const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const createToken = async (obj) => {
  const payload = {
    id: obj.id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  return token;
};

module.exports = createToken;
