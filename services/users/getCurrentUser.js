const { HTTP401Error } = require("../../helpers/errorHandlers");
const User = require("../../models/users");

const getCurrentUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new HTTP401Error("Not authorized");
  }

  return user;
};

module.exports = getCurrentUser;
