const Joi = require("joi");
// const { Types } = require("mongoose");
const { HttpCode } = require("../utils");

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(15).required(),
});

const validateUser = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: `Field ${err.message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports = validateUser;
