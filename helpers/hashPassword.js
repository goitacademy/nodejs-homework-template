const bcrypt = require("bcrypt");

const createHashPassword = async (password) => {
  const result = await bcrypt.hash(password, 10);
  return result;
};

const comparePassword = async (password, userPassword) => {
  const result = await bcrypt.compare(password, userPassword);
  return result;
};

const hashPasswords = { comparePassword, createHashPassword };

module.exports = hashPasswords;
