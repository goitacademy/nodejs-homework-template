const { User } = require("../../models");
const { AuthError } = require("../../helpers");

const authUser = async (id) => {
  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new AuthError("Not authorized");
  }

  return user;
};

module.exports = authUser;
