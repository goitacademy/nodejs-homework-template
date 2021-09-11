const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),

  favorite: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional(),

  favorite: Joi.boolean().optional(),
}).or("name", "email", "phone", "favorite");

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, obj, next, message) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({ status: 400, message: message });
  }
};

module.exports = {
  validationCreateContact: (
    req,
    res,
    next,
    message = "missing required name field"
  ) => {
    return validate(schemaCreateContact, req.body, next, message);
  },
  validationUpdateContact: (req, res, next, message = "missing fields") => {
    return validate(schemaUpdateContact, req.body, next, message);
  },
  validationUpdateStatusContact: (
    req,
    res,
    next,
    message = "missing field favorite"
  ) => {
    return validate(schemaUpdateStatusContact, req.body, next, message);
  },
};
