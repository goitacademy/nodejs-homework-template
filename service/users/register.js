const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const gravatar = require("gravatar");

const register = async ({ password, email, subscription }) => {
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, `Email ${email} in use.`);
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ password, email, subscription, avatarURL });
  await newUser.save();

  return newUser;
};


module.exports = register;