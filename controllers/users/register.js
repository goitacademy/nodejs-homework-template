const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/users");
const HttpError = require("../../helpers/HttpError");
const gravatar = require("gravatar");

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

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const avatarURL = gravatar.url(
      email,
      { s: "250", d: "retro", r: "pg" },
      true
    );

    const newUser = await User.create({
      email,
      password: hashedPassword,
      token,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        token: newUser.token,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

module.exports = registerUser;
