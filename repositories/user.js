const { User } = require("../model");

const addUser = async (body) => {
  const result = await User.create(body);
  return result;
};

module.exports = {
  addUser,
};
