const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { uid } = require("uid");

const { ctrlWrapper } = require("../../utils");

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const sendEmail = require("../../services/email/sendEmail");

const emailTemplate = require("../../services/email/emailTemplate");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `Email ${email} alredy in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uid();

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  if (!result) {
    throw HttpError(404, `Creation failed`);
  }

  const verifyEmail = emailTemplate(email, verificationToken);

  await sendEmail(verifyEmail);

  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
