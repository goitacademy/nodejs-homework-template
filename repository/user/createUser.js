const { User } = require("../../model");

const createUser = async (body) => {
  const user = new User(body);
  return await user.save();
};

module.exports = createUser;
