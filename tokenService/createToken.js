const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { SECRET_KEY } = process.env;

const createToken = async (id) => {
  const token = jwt.sign({ id }, SECRET_KEY, { expirens: "1h" });
  await User.findByIdAndUpdate(id, { token }, { new: true });

  return token;
};

module.exports = createToken;
