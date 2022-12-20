const { User } = require("../../model/user");
const requestError = require("../../helpers/requestError");
const sendEmail = require("../../helpers/sendEmail");
const createVerifyEmail = require("../../helpers/createVerifyEmail");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const user = await User.findOne({ email });

  if (user) {
    throw requestError(409, "E-mail is already in use");
  } else {
    const payload = {
      email,
    };

    const verificationToken = nanoid();

    const newUser = await User.create({
      email,
      password: hashedPassword,
      subscription,
      avatarURL,
      verificationToken,
    });

    const mail = createVerifyEmail(email, verificationToken);

    await sendEmail(mail);

    res.status(201).json({
      code: 201,
      status: "success",
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  }
};

module.exports = signup;
