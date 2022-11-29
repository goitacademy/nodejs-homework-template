const bcrypt = require("bcryptjs");
const { userSchema } = require("../../models");
const { RequestError } = require("../../helpers");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await userSchema.User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const registerUser = await userSchema.User.create({ email, password: hashPassword, avatarURL });
  res.status(201).json({
    user: {
      email: registerUser.email,
      subscription: registerUser.subscription
    }
  });
};

module.exports = register;
