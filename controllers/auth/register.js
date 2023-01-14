const { nanoid } = require("nanoid");
const { User } = require("../../models/");
const gravatar = require("gravatar");
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const error = new Error("Email in use");
    error.status = 409;
    throw error;
  }
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);

  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`,
  };

  await sendEmail(mail);
  const newUser = new User({
    email,
    subscription,
    avatarURL,
    verificationToken,
  });

  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    Status: "created",
    ResponseBody: { user: email, subscription, avatarURL, verificationToken },
  });
};

module.exports = register;
