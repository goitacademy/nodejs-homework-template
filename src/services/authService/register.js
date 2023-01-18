const gravatar = require("gravatar");
const { User } = require("../../db");
const { httpError } = require("../../helpers");

const register = async (email, password) => {
  if (await User.findOne({ email })) throw httpError(409, "This email in use!");
  const url = gravatar.url(email, { s: "250" }, false);

  const user = new User({ email, password, avatarURL: url });
  await user.save();
  return user;
};

module.exports = { register };
