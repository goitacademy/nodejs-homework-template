/* eslint-disable no-throw-literal */
const bcrypt = require("bcrypt");

const issuetoken = require("./issueToken");

const loginHandler = async (password, user) => {
  if (bcrypt.compareSync(password, user.password)) {
    return {
      user,
      token: issuetoken(user),
    };
  } else {
    return false;
  }
};
module.exports = loginHandler;
