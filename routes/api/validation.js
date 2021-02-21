const Joi = require('joi');

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.number().integer().min(1).max(45).required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.number().integer().min(1).max(45).required(),
});

const schemaUpdateStatusContact = Joi.object({
  phone: Joi.boolean().required(),
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

module.exports.createContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};

module.exports.updateStatusContact = (req, res, next) => {
  return validate(schemaUpdateStatusContact, req.body, next);
};
