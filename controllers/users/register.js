const { User } = require("../../models");
const { userSchema } = require("../../schemas");

const register = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "Missing required name field",
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
    const result = await User.create({ email, password });
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
