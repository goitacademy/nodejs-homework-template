const bcrypt = require("bcryptjs");

const makeHashPass = (pass) => {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
};

const compareHashPass = (pass, hashPass) => {
  return bcrypt.compareSync(pass, hashPass);
};

module.exports = { makeHashPass, compareHashPass };
