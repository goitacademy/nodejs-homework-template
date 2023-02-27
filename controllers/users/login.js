const createError = require("http-errors");
const { modelUser } = require("../../models");
const { loginSchema } = require("../../schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw createError(400, `${error.message}`);
    }
    const { email, password } = req.body;
    const user = await modelUser.User.findOne({ email });
    if (!user) {
      throw createError(401, "Email is wrong");
    }
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!passCompare) {
      throw createError(401, "Password is wrong");
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await modelUser.User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = login;