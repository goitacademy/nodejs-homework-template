const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const { User } = require("../../models");

async function signUp(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict(`Email ${email} in use`);
    }

    const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = await User.create({ email, password: hashedPass });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      },
    });
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }

    next(error);
  }
}

module.exports = signUp;
