const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw HttpError(401, "Error. Provide all required fields");
  }

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "test veryfy email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click me</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201);
  res.json({
    code: 201,
    message: "Success",
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
