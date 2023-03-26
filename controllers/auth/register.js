const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { RequestError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

const { PORT = 3000 } = process.env;

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, `User with ${email} already exist`);
  }
  const verificationToken = nanoid();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  await User.create({
    email,
    subscription,
    verificationToken,
    avatarURL,
    password: hashPassword,
  });
  const msg = {
    to: email,
    subject: "The mail confirmation",
    html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${verificationToken}">To confirm email!</a>`,
  };
  await sendEmail(msg);
  res.status(201).json({
    user: {
      email,
      subscription,
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = register;