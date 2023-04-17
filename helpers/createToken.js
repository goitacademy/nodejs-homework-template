const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const createAndAddToken = async (obj) => {
  const payload = {
    id: obj.id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  obj.token = token;
  await obj.save();
  return token;
};

module.exports = createAndAddToken;
