const createError = require("http-errors");
const { modelUser } = require("../../models");
const { usersSchema } = require("../../schema");
const bcrypt = require("bcryptjs");
const register = async (req, res, next) => {
  try {
    const { error } = usersSchema.validate(req.body);
    if (error) {
      throw createError(400, `${error.message}`);
    }
    const { email, password, subscription } = req.body;
    const user = await modelUser.User.findOne({ email });
    if (user) {
      throw createError(409, `Email in use ${email}`);
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await modelUser.User.create({
      email,
      password: hashPassword,
      subscription,
    });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = register;
