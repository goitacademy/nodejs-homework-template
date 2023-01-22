const Auth = require("../../models/auth");
const bcrypt = require("bcrypt");
const signUpSchema = require("../../schemas/Joi/signUpSchema");
const { BadRequest, Conflict } = require("http-errors");

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = signUpSchema.validate(req.body);

    if (error) {
      next(BadRequest(error.message));
    }

    const salt = await bcrypt.genSalt();
    const cryptPassword = await bcrypt.hash(password, salt);

    const newUser = await Auth.create({ email, password: cryptPassword });

    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      next(Conflict("Email is use"));
    }

    next(error);
  }
};

module.exports = signUp;
