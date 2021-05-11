const Joi = require('joi');

const schemaRegistration = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().alphanum().min(4).max(20).required(),
});
const schemaLogin = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().alphanum().min(4).max(20).required(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`,
    });
  }
  next();
};

module.exports.Registration = (req, res, next) => {
  return validate(schemaRegistration, req.body, next);
};

module.exports.Login = (req, res, next) => {
  return validate(schemaLogin, req.body, next);
};
