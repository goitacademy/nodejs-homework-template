const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/userSchema");
const { createError, userJoiSchema } = require("../../helpers");

const signup = async (req, res, next) => {
  try {
    const { error } = userJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, "JoiError. Missing required field");
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const result = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });
    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarURL: result.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
