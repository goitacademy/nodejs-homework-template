const User = require("./schemas/user");

const createUser = ({ email, password }) => {
  return User.create({ email, password });
};

const findUser = ({ email }) => {
  return User.findOne({ email });
};

module.exports = {
  createUser,
  findUser,
};
