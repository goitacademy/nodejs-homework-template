const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { sendEmail } = require("../../helpers");
const { User } = require("../../model");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Verification successful",
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Confirm Email</a>`,
  };
  await sendEmail(mail);

  res
    .status(201)
    .json({ user: { email, password, avatarURL, verificationToken } });
};

module.exports = register;
