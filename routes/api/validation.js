const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "de"] },
    })
    .required(),
  phone: Joi.string().required(),
  address: Joi.string().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "de"] },
    })
    .optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
}).or("name", "email", "phone", "address");

const schemaUpdateContactAddress = Joi.object({
  address: Joi.string().required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 400,
      message: err.message,
    });
  }
};

module.exports = {
  createContactValidation: (req, res, next) => {
    return validate(schemaCreateContact, req.body, next);
  },
  updateContactValidation: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
  },
  updateContactAddressValidation: (req, res, next) => {
    return validate(schemaUpdateContactAddress, req.body, next);
  },
};