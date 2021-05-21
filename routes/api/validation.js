const Joi = require('joi');

const validateAddContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}/)
    .optional(),
}).xor('email', 'phone');
const validateUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}/)
    .required(),
});

const validateEditContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}/)
    .optional(),
}).xor('name', 'email', 'phone');

const validate = async (schema, request, next) => {
  try {
    await schema.validateAsync(request);
    next();
  } catch (error) {
    next({
      status: 400,
      message: error.message.replace(/"/g, ''),
    });
  }
};

module.exports = {
  validationAddedContact: (req, res, next) => {
    return validate(validateAddContact, req.body, next);
  },
  validationUpdatedContact: (req, res, next) => {
    return validate(validateUpdateContact, req.body, next);
  },
  validationEditedContact: (req, res, next) => {
    return validate(validateEditContact, req.body, next);
  },
};
