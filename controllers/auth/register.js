const { Conflict } = require("http-errors");
// const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");
const { User } = require("../../models");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const verificationToken = nanoid();
  const avatartURL = gravatar.url(email);
  const newUser = User({ name, email, avatartURL, verificationToken });

  newUser.setPassword(password);
  await newUser.save();
  const mail = {
    to: email,
    subject: "email verification",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}>Verify email</a>`,
  };

  await sendEmail(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        name,
        avatartURL,
        verificationToken,
      },
    },
  });
};
module.exports = register;
