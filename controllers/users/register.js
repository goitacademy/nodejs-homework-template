const { User } = require("../../models");
const { userSchema } = require("../../schemas");

const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({
        status: "Conflict",
        code: 409,
        message: "Email in use",
      });
      return;
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({ email, password: hashPassword });
    res.status(201).json({
      status: "Created",
      code: 201,
      data: {
        user: {
          email,
          subscription: "starter",
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
