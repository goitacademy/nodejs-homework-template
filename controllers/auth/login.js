const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/userSchema");
const { createError } = require("../../helpers");
const { userJoiSchema } = require("../../middlewares");
const { JWT_SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { error } = userJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, "JoiError. Missing required field");
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw createError(401, "Email or password is wrong");
    }

    if (!user.verify) {
      throw createError(401, "Email not verify");
    }

    const compareResult = bcrypt.compare(password, user.password);
    if (!compareResult) {
      throw createError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });
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
