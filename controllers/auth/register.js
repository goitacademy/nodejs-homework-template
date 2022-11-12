const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { User } = require("../../models/user");
const { sendEmail, requestError } = require("../../helpers");
const { v4 } = require("uuid");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, `User with email ${email} already exists`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();

  await User.create({
    password: hashPassword,
    email,
    subscription: "starter",
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Confirm registration",
    html: `GET http://localhost:3000/api/users/verify/${verificationToken}`,
  };
  await sendEmail(mail);
  res.status(201).json({
    message: "Success",
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = register;
