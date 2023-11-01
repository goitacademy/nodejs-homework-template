const { hash } = require("bcryptjs");

const hashPassword = async (password) => {
  const result = await hash(password, 10);
  return result;
};

module.exports = { hashPassword };
