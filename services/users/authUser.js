const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const authUser = async (id) => {
  const user = await User.findOne({ _id: id });

  if (!user) {
    throw RequestError(401, "Not authorized");
  }

  return user;
};

module.exports = authUser;
