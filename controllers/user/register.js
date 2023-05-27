const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const User = require("../../models/user");
const main = require("../../middlewares/sendMailGrid");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashdPassword = await bcrypt.hash(password, salt);
  const avatar = gravatar.url(email, { protocol: "http" });

  try {
    const verificationToken = v4();
    const savedUser = await User.create({
      email,
      password: hashdPassword,
      avatarURL: avatar,
      verificationToken,
    });

    main({
      to: email,
      subject: "Please confirm your email",
      html: `<a href='http://localhost:3000/user/verify/${verificationToken}'>Confirm your email</a>`,
    });

    res.status(201).json({
      user: {
        email,
        subscription: savedUser.subscription,
      },
    });
  } catch (err) {
    if (err.message.includes("E11000 duplicate key error")) {
      return res.status(409).json({ message: "Email in use" });
    }
    throw err;
  }
};

module.exports = register;
