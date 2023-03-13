const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");

const { User } = require("../../models");

const signup = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with this email:${email} already registered`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const verificationToken = nanoid();

  const avatarURL = gravatar.url(email);
  await User.create({ subscription, email, password: hashPassword, avatarURL, verificationToken});

  const mail = {
    to: email,
    subject: "Approve email",
    html: `<a target="_blank" hreaf="http://localhost:3777/api/users/verify/${verificationToken}">Approve email</a>`
};

await sendEmail(mail);

  res.status(201).json({
    status: 'Created',
    code: 201,
    ResponseBody: {
        user: {
            email,
            subscription,
            avatarURL,
            verificationToken
        }
    }
  })
};

module.exports = signup;
