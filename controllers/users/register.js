// const { Conflict } = require("http-errors");
const { User } = require("../../models");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      res.status(409).json({
        status: "Error",
        code: 409,
        message: "Email in use",
      });
      return;
      // throw new Conflict("Email in use");
    }

    const result = await User.create({ email, password });
    res.status(201).json({
      status: "Success",
      code: 201,
      data: {
        user: {
          email,
          subscription: result.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
