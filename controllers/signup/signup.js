const { User } = require("../../models/users");
const Conflict = require("http-errors");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  const { password, email, subscription = "starter" } = req.body;

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  await User.create({ email, password: hashPassword });
  try {
    res.status(201).json({
      status: "sucsess",
      code: 201,
      data: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
