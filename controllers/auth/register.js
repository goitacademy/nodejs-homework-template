const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user/user");
const { HttpError, emailSender } = require("../../helpers/index.js");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const authKey = nanoid();

  const sendEmailOn = {
    email,
    authKey,
  };

  emailSender(sendEmailOn);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode: authKey,
  });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = {
  register,
};
