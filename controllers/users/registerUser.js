const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");
const { HttpError, sendEmail, verifyEmail } = require("../../helpers");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);

  const result = await User.create({
    ...req.body,
    password: hash,
    verificationToken,
  });
  await sendEmail(verifyEmail(email, verificationToken));
  res.status(201).json({
    user: {
      email,
      subscription: result.subscription,
      avatarURL,
    },
  });
};

module.exports = registerUser;
