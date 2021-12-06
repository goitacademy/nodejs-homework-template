const { HTTP401Error } = require("../../helpers/errorHandlers");
const User = require("../../models/users");

const logout = async (id) => {
  const user = await User.findByIdAndUpdate(id, { token: null });

  if (!user) {
    throw new HTTP401Error("Not authorized");
  }

  return user;
};

module.exports = logout;
