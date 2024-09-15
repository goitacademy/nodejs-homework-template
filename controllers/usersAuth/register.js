const { User, schemas } = require("../../models/user");
const { sendEmail } = require("../../utils");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { error } = schemas.register.validate(req.body);
  if (error) {
    res.status(400).json({ message: "Incorrect format of entered data" });
    return;
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "User with this email already exists" });
    return;
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Phonebook app registration approvement",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to verify</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    user: {
      name: result.name,
      email: result.email,
      subscription: result.subscription,
      avatarURL: avatarURL,
    },
  });
};

module.exports = register;
