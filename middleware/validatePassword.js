const bcrypt = require("bcryptjs");

const isValidPassword = (loggedPas, pas) => {
  return bcrypt.compareSync(loggedPas, pas);
};

const incryptPassword = (pas) => {
  return bcrypt.hashSync(pas, bcrypt.genSaltSync(8));
};

module.exports = { isValidPassword, incryptPassword };
