const { User } = require("../../models");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(
        409,
        `User with this email:${email} already registered`
      );
    }

    const avatarURL = gravatar.url(email);
    const saltPassword = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, saltPassword);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      avatarURL,
    });
    const { subscription } = newUser;

    res.status(201).json({
      status: "Created",
      code: 201,
      ResponseBody: {
        user: {
          email,
          subscription,
          avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;