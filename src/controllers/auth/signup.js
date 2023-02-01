const { Conflict } = require("http-errors");

const { User } = require("../../models/index");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict(`User with ${email} already exist `);
    }
    const result = await User.create({ email, password });
    res.status(201).json({
      status: "success",
      code: 201,
      user: { email: result.email, subscription: result.subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
