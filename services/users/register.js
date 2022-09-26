const { User } = require("../../models");
const { ConflictEmailError } = require("../../helpers");

const register = async ({ password, email, subscription }) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new ConflictEmailError(`Email ${email} in use.`);
  }

  const newUser = new User({ password, email, subscription });
  await newUser.save();

  return newUser;
};

module.exports = register;
