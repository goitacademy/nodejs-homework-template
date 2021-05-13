const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(4).max(30).required(),
  email: Joi.string().email({ multiple: false }).required(),
  phone: Joi.string().min(6).max(30).required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(4).max(30).optional(),
  emil: Joi.string().email({ multiple: false }).optional(),
  phone: Joi.string().min(6).max(30).optional(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (error) {
    console.log(error.message);
    next(error.message);
  }
};

const validateCreateContact = (req, _res, next) =>
  validate(schemaCreateContact, req.body, next);

const validateUpdateContact = (req, _res, next) =>
  validate(schemaUpdateContact, req.body, next);

module.exports = {
  validateCreateContact,
  validateUpdateContact,
};
