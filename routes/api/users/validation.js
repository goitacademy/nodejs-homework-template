const Joi = require("joi");
const { HttpCode } = require("../../../helpers/constants");

const schemaRegistrationUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  sex: Joi.string(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports.regUser = (req, res, next) => {
  return validate(schemaRegistrationUser, req.body, next);
};

module.exports.loginUser = (req, res, next) => {
  return validate(schemaLoginUser, req.body, next);
};

module.exports.uploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "Field of avatar with file not found",
    });
  }
  next();
};
