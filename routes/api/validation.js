const Joi = require('joi');

const schemaCreateUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.string().required(),
});

const schemaUpdateUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.string().optional(),
}).min(1);

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const message = error.details[0].message;
    return next({
      status: 400,
      message: `Field ${message.replace(/"/g, '')}`,
    });
  }
  next();
};

const createUserValidation = (req, res, next) => {
  return validate(schemaCreateUser, req.body, next);
};

const updateUserValidation = (req, res, next) => {
  return validate(schemaUpdateUser, req.body, next);
};

module.exports = {
  createUserValidation,
  updateUserValidation,
};
