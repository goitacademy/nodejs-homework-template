const Joi = require('joi');

const schemaRegistrationUser = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  subscription: Joi.string().optional(),
});

const schemaLoginUser = Joi.object({
  token: [Joi.string(), Joi.number()],
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message,
    });
  }
  next();
};
module.exports.registrationUser = (req, res, next) => {
  return validate(schemaRegistrationUser, req.body, next);
};
module.exports.loginUser = (req, res, next) => {
  return validate(schemaLoginUser, req.body, next);
};
