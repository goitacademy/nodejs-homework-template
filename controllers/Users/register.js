const { usersModel } = require("../../models/users");
const { HttpError, sendEmail } = require("../../Helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email);
  const user = await usersModel.findOne({ email: email });
  if (user) {
    throw HttpError(409, "User already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationCode = nanoid();
  const newUser = {
    ...req.body,
    avatarURL,
    password: hashPassword,
    verificationCode,
  };

  const verificationData = {
    to: email,
    subject: `Verify Email`,
    html: `<a target="_blank" href="${process.env.PROJECT_URL}/api/users/verify/${verificationCode}">Click to verify email</a>`,
  };

  await sendEmail(verificationData);

  const resp = await usersModel.create(newUser);

  res.json({
    code: 201,
    message: "User registered successfully",
    resp,
  });
};

module.exports = register;
