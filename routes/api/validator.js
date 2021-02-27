const Joi = require('joi');

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/)
    .required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string().required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/)
    .optional(),
  password: Joi.string().min(8).optional(),
  subscription: Joi.string().optional(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Bad request: ${message.replace(/"/g, '')}`,
    });
  }
  next();
};

module.exports.createContact = (req, _res, next) => {
  validate(schemaCreateContact, req.body, next);
};

module.exports.updateContact = (req, _res, next) => {
  validate(schemaUpdateContact, req.body, next);
};
