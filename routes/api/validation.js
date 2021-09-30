const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(40).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Field: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports.addContact = (req, res, next) => {
  return validate(schemaAddContact, req.body, next);
};

module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
