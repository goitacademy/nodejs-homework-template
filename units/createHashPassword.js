const bcrypt = require("bcrypt");

const createHashPassword = async (password) => {
  const salt = 10;
  const result = await bcrypt.hash(password, salt);
  return result;
};

module.exports = createHashPassword;
