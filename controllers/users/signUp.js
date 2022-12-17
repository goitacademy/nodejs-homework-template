const { User } = require("../../models/user");
const createError = require("http-errors");
const gravatar = require("gravatar");
const uuid = require("uuid");
// const { sendEmail } = require("../../utils");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const verifyToken = uuid.v4();

  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, avatarURL, verifyToken });
  newUser.setPassword(password);
  newUser.save();

  // const mail = {
  //   to: email,
  //   subject: "Email verification",
  //   html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verifyToken}">Click here to verify your email</a>`,
  // };

  // await sendEmail(mail);

  res.status(201).json({
    status: "succes",
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
        verifyToken,
        subscription: "starter",
      },
    },
  });
};

module.exports = signUp;
