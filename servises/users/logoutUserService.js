const { User } = require("../../db/userModel");
const { RequestError } = require("../../helpers/requestError");

const logoutUserService = async (id) => {
  const user = await User.findByIdAndUpdate({ _id: id }, { token: null });
  if (!user) {
    throw RequestError(401, "Not authorized");
  }
};
module.exports = { logoutUserService };
