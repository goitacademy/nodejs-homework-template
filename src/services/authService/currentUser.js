const { User } = require("../../db");
const { httpError } = require("../../helpers");

const currentUser = async (id) => {
  const user = await User.findById(id);
  if (!user || !user.token) throw httpError(401, "Not authorized");
  return user;
};

module.exports = { currentUser };
