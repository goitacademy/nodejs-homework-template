const { User } = require("../../models/user");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { createToken, sendMail } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const newUser = new User({ name, email, avatarURL, verificationToken });

  await newUser.setPassword(password);

  const mail = {
    to: email,
    subject: " Email`s verify",
    html: `<a target='_blank' href='http://localhost:3000/api/auth/verify/${verificationToken}' >Go to verify email</a>`,
  };
  await sendMail(mail);

  const payload = {
    id: newUser._id,
  };
  const token = createToken(payload);
  newUser.token = token;

  await newUser.save();

  res.status(201).json({
    response: "success",
    status: 201,
    data: {
      user: {
        name,
        email,
        avatarURL,
      },
      token,
    },
  });
};

module.exports = register;
