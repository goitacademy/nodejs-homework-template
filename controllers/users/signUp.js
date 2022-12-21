const { User } = require("../../models/user");
const createError = require("http-errors");
const gravatar = require("gravatar");
const uuid = require("uuid");
const { sendEmail } = require("../../utils");

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const verificationToken = uuid.v4();

  const avatarURL = gravatar.url(email);
  const newUser = new User({
    email,
    avatarURL,
    verificationToken,
    password,
  });
  newUser.setPassword(password);
  await newUser.save();
  console.log(newUser, `useruseruser`);

  const mail = {
    to: email,
    from: "infoyourcontactbook@gmail.com",
    subject: "Email verification",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click here to verify your email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "succes",
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
        verificationToken,
        subscription: "starter",
      },
    },
  });
};

module.exports = signUp;
