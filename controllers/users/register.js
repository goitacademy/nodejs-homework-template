const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { userSchema } = require("../../schemas");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const register = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { email, pass } = req.body;
    const userCheck = await User.findOne({ email });
    if (userCheck !== null) {
      throw HttpError(409, "Email in use");
    }
    const hashedPassword = await bcrypt.hash(pass, saltRounds);
    const result = await User.create({ email, password: hashedPassword });
    const resMesage = {
      user: {
        email: result.email,
        subcription: result.subscription,
      },
    };
    res.status(201).json(resMesage);
  } catch (error) {
    next(error);
  }
};

module.exports = register;
