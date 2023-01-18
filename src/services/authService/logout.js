const { User } = require("../../db");
const { httpError } = require("../../helpers");

const logout = async (id) => {
  const user = await User.findById(id);

  if (!user.token) throw httpError(401, "Not authorized");

  await User.findByIdAndUpdate(id, { $set: { token: null } });
};

module.exports = { logout };
