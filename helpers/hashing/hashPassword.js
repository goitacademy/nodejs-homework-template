var bcrypt = require("bcryptjs");

const hashingPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  return hashedPassword;
};

module.exports = hashingPassword;
