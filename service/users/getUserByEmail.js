const User = require("../../models/user.js");

const getUserByEmail = async (email) => {
 
  return User.findOne({email});
};

module.exports = getUserByEmail;