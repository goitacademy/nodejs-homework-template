const Joi = require("joi");
const {
  Subscription,
  HttpCode,
  Status,
} = require("../../../helpers/constants");

const schemaCreateUser = Joi.object({
  password: Joi.string().min(6).max(15).required(),
  email: Joi.string().email().min(3).max(45).required(),
});

const schemaloginUser = Joi.object({
  password: Joi.string().min(6).max(15).optional(),
  email: Joi.string().email().min(3).max(45).optional(),
});

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string().valid(
    Subscription.FREE,
    Subscription.PREMIUM,
    Subscription.PRO
  ),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports.createUser = (req, _res, next) => {
  return validate(schemaCreateUser, req.body, next);
};

module.exports.loginUser = (req, _res, next) => {
  return validate(schemaloginUser, req.body, next);
};

module.exports.updateSubscription = (req, _res, next) => {
  return validate(schemaUpdateSubscription, req.body, next);
};

module.exports.validateUploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: Status.ERROR,
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "Field of avatar with file not found",
    });
  }
  next();
};
