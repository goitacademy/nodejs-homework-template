const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const Joi = require("joi");

const joiShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const signup = async (req, res) => {
  try {
    const { error } = joiShema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required name field",
      });
    }
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({
        status: "error",
        code: 409,
        message: `User with ${email} already exist`,
      });
      return;
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({ name, email, password: hashPassword });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription: "starter",
        },
      },
    });
  } catch {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
};
module.exports = signup;
