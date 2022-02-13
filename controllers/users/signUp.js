const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");

async function signUp(req, res, next) {
  try {
    const { email, password } = req.body;
    gravatar.url(email);
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict(`Email ${email} in use`);
    }

    const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(
      email,
      {
        s: "250",
        d: "wavatar",
      },
      true
    );

    const newUser = await User.create({
      email,
      password: hashedPass,
      avatarURL,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
          avatarURL: newUser.avatarURL,
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
