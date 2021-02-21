const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string().min(1).max(20).required(),
  email: Joi.string().email().required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  phone: Joi.string().min(1).max(20).optional(),
  email: Joi.string().email().optional(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports.createContactValidation = (req, _res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.updateContactValidation = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
