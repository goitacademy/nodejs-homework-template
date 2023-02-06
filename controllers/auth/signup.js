const { User } = require("../../models");
const createError = require("http-errors");
const bcrypt = require("bcrypt");

const signUp = async (req, res, next) => {
  try {
    const { email, subscription, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(
        409,
        `User with this email:${email} already registered`
      );
    }

    const saltPassword = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, saltPassword);

    await User.create({
      subscription,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "Created",
      code: 201,
      ResponseBody: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;