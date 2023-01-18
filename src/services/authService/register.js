const { User } = require("../../db");
const { httpError } = require("../../helpers");

const register = async (email, password) => {
  if (await User.findOne({ email })) throw httpError(409, "This email in use!");
  const user = new User({ email, password });
  await user.save();
  return user;
};

module.exports = { register };
