const Joi = require("joi");

const schemaRegistration = Joi.object({
  email: Joi.string().min(3).max(45).required(),
  subscription: Joi.string().required(),
  password: Joi.string().min(8).max(15).required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().min(3).max(45).required(),
  password: Joi.string().min(8).max(15).required(),
  // token: Joi.string().optional(),
});

const schemaUpdateSubscription = Joi.object({
  // email: Joi.string().min(3).max(45).required(),
  // id: Joi.string().required(),
  subscription: Joi.string().required(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Field: ${message.replace(/"/g, "")} `,
    });
  }
  next();
};

module.exports.registration = (req, _res, next) => {
  return validate(schemaRegistration, req.body, next);
};

module.exports.login = (req, _res, next) => {
  return validate(schemaLogin, req.body, next);
};

module.exports.updateSubscription = (req, _res, next) => {
  return validate(schemaUpdateSubscription, req.body, next);
};
