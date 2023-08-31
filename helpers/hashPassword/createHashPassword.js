const bcrypt = require("bcryptjs");

const createHashPassword = async (pass, sol = 10) => {
  const hashPassword = await bcrypt.hash(pass, sol);
  return hashPassword;
};

module.exports = createHashPassword;
