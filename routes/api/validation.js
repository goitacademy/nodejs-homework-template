const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(2).max(15).required(),
  email: Joi.string().required(),
  phone: Joi.number().greater(7).required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(15).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.number().greater(7).optional(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);

  if (error) {
    const [{ message }] = error.details;

    return next({
      status: 400,
      message: `Not valid data`,
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
