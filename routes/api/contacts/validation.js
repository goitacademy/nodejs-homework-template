const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(1).max(30).required(),
  email: Joi.string().min(3).max(45).required(),
  phone: Joi.string().min(10).max(30).required(),
  favorite: Joi.boolean().required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(1).max(30).optional(),
  email: Joi.string().alphanum().min(3).max(45).optional(),
  phone: Joi.string().min(10).max(30).optional(),
  favorite: Joi.boolean().optional(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Field: ${message.replace(/"/g, "")} `,
    });
  }
  next();
};

module.exports.createContact = (req, _res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.updateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
