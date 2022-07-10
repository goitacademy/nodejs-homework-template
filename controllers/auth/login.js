const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/userSchema");
const { createError, userJoiSchema } = require("../../helpers");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = userJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, "JoiError. Missing required field");
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw createError(401, "Email or password is wrong");
    }

    if (!bcrypt.compare(password, user.password)) {
      throw createError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    const result = await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
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

module.exports = login;
