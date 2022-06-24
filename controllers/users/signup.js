// const userOperations = require("../../userOperations");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { genSaltSync } = require("bcrypt");
const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw createError(409, `User with id=${email} alredy exist`);
    }
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, genSaltSync(10));
    await User.create({ email, password: hashPassword, avatarURL });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }

  //   const result = userOperations.signup(req.body);
};
module.exports = signup;
