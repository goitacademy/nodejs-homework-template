const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const User = require("../../models/users");
const HttpError = require("../../helpers/HttpError");

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email is used",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(
      email,
      { s: "250", d: "retro", r: "pg" },
      true
    );

    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });

    const token = jwt.sign({ userId: newUser._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        token: token,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

module.exports = registerUser;
