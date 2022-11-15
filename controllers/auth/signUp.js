const { Conflict } = require("http-errors");
const { User } = require("../../models");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");

const signUp = async (req, res) => {
  const { email, password, subscription = "starter", token } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = new User({
    email,
    subscription,
    token,
    avatarURL,
    verificationToken,
  });

  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: "Email confirming",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm your email </a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email,
      subscription,
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = signUp;
