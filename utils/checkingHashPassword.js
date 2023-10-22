const bcrypt = require("bcrypt");

const checkingHashPassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

module.exports = checkingHashPassword;
