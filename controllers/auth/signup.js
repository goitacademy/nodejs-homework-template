const { User } = require("../../schemas/userSchema");

const { Conflict } = require("http-errors");

const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`User with ${email} already exist`);
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({ name, email, password: hashPassword });
    res.status(201).json({
      status: "succses",
      code: 201,
      data: {
        user: {
          email,
          name,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
