const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const logout = async (id) => {
  const user = await User.findOne({ _id: id });

  if (!user) {
    throw RequestError(401, "Email or password is wrong.");
  }

  await User.updateOne({ _id: id }, { $unset: { token: "" } });
  return true;
};

module.exports = logout;
