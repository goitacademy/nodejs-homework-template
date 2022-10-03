const { User } = require("./schemasUsers");

const addUser = async (body) => {
  return User.create(body);
};

module.exports = {
  addUser,
};
