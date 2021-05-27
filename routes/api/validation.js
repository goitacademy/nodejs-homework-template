const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  age: Joi.number().integer().min(1900).max(2013),
  inArray: Joi.boolean().optional(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),

  age: Joi.number().integer().min(1900).max(2013).optional(),
  inArray: Joi.boolean().optional(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
}).or("name", "email", "inArray");

const schemaUpdateStatusContact = Joi.object({
  inArray: Joi.boolean().required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 404,
      message: err.message.replace(/"/g, ""),
    });
  }
};

module.exports = {
  validationCreateContact: (req, res, next) => {
    return validate(schemaCreateContact, req.body, next);
  },
  validationUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
  },
  validationUpdateStatusContact: (req, res, next) => {
    return validate(schemaUpdateStatusContact, req.body, next);
  },
};
