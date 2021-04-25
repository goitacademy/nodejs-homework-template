const Joi = require("joi");
const { HttpCode, Subscription } = require("../helpers/constants");

module.exports.validateUploadAvatar = (req, res, next) => {
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

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .required()
    .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;

    return next({
      status: HttpCode.BAD_REQUEST,
      message: message,
      data: "Bad Request",
    });
  }

  next();
};

module.exports.validateUpdateSubscription = (req, res, next) => {
  return validate(schemaUpdateSubscription, req.body, next);
};
