const { User } = require("../../models");
const gravatar = require("gravatar");
const { ConflictEmailError } = require("../../helpers");

const register = async ({ password, email, subscription }) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new ConflictEmailError(`Email ${email} in use.`);
  }

  const avatarURL = gravatar.url(email);
  const newUser = new User({ password, email, subscription, avatarURL });
  await newUser.save();

  return newUser;
};

module.exports = register;
