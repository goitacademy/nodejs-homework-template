const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({
      status: "error",
      code: 409,
      message: `Email '${email}' in use`,
    });
  }

  const verificationToken = v4();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Email confirmation.",
    html: `
      <div>
        <h1>Welcome</h1>
        <br />
        <p>Thank you for yusing our service.</p>
        <br />
        <a target="_blank" href="http://localhost:5000/api/user/verify/:${verificationToken}">Finish registration</a>
      </div>
    `,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "succes",
    code: 201,
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = signup;
