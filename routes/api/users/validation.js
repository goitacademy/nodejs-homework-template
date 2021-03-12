const Joi = require("joi");

const schemaUserRegistration = Joi.object({
  name: Joi.string().min(2).max(20).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  subscription: Joi.string().optional(),
  password: Joi.string().required(),
});

const schemaUserLogin = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),

  password: Joi.string().required(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message,
      data: "bad request",
    });
  }
  next();
};

module.exports.userRegistation = (req, res, next) => {
  return validate(schemaUserRegistration, req.body, next);
};

module.exports.userLogin = (req, res, next) => {
  return validate(schemaUserLogin, req.body, next);
};
