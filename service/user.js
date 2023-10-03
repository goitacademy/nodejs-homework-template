const User = require("../schemas/user");

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

module.exports = {
  getUserByEmail,
};
