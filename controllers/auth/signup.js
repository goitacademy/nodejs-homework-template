const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");
const gravatar = require("gravatar");
const { sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

const signup = async (req, res) => {
  const { password, email, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} is already exist`);
  }
  const avatarURL = gravatar.url(email, { d: "identicon" });
  const verificationToken = nanoid();
  const newUser = new User({
    email,
    subscription,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: "Welcome to PhoneBook! Confirm Your Email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm Email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({ email, subscription, avatarURL, verificationToken });
};

module.exports = signup;
