const Joi = require("joi");
// const phoneJoi = Joi.extend(require("joi-phone-number"));

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]{12}$/)
    .pattern(/^\d+$/)
    .messages({
      "string.pattern.base": `Phone number must have 12 digits.`,
    })
    .required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .optional(),
  phone: Joi.string()
    .regex(/^[0-9]{12}$/)
    .pattern(/^\d+$/)
    .messages({
      "string.pattern.base": `Phone number must have 12 digits.`,
    })
    .optional(),
}).or("name", "email", "phone");

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 400,
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
};
