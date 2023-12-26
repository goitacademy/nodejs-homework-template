const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");
const { nanoid } = require("nanoid");
const { templateHTML } = require("../../messages");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const data = {
    email,
    verificationToken,
  };

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: templateHTML.messageVerify(data),
  };
  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = register;
