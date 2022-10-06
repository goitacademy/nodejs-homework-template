const { User } = require("./schemasAuth");

const addUser = async (name, email, password) => {
  const user = await User.findOne(name, email, password);
  if (user) {
    throw new Error(status(409), "Email in use");
  }
  return User.create(body);
};

module.exports = {
  addUser,
};
