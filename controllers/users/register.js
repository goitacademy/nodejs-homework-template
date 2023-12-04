const bcrypt = require("bcrypt");
const User = require("../../models/users");
const { ctrlWrapper } = require("../../helpers");
const gravatar = require("gravatar");
const crypto = require("crypto");
const sendEmail = require("../../helpers/sendEmail");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (user !== null) {
    return res.status(409).send({ massage: "Email in use" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomUUID();
  await sendEmail({
    to: email,
    subject: "Welcome to contact",
    html: `To confirm your registration please click on the <a href="http://localhost:3000/api/users/verify/${verificationToken}">Link</a>`,
    text: `To confirm your registration please open the link http://localhost:3000/api/users/verify/${verificationToken}`,
  });
  await User.create({
    email,
    verificationToken,
    password: passwordHash,
    avatarURL,
  });
  res.status(201).send({
    user: {
      email: email,
      subscription: "starter",
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
