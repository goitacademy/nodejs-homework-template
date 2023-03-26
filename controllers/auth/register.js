const bcrypt = require("bcrypt");

const gravatar = require("gravatar");

const { v4 } = require("uuid");
require("dotenv").config();

const { User } = require("../../models/user");

const { sendVerificationEmail } = require("../../utils");

const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();

  // const newUser = await User.create({
  //   name,
  //   email,
  //   password: hashPassword,
  //   avatarURL,
  // });

  const mail = {
    to: email,
    subject: "Please, confirm your registration",
    html: `<a href=http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}>Click</a> for confirmation`,
  };

  await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  await sendVerificationEmail(mail);

  res.status(201).json({
    user: { name, email },
    // email: newUser.email,
    // name: newUser.name,
  });
};

module.exports = register;
