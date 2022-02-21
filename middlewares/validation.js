const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),

  phone: Joi.string().required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .optional(),

  phone: Joi.string().optional(),
});

const validate = (schema, res, obj, next) => {
  const validationLogs = schema.validate(obj);
  if (validationLogs.error) {
    return res.status(400).json({
      code: 400,
      status: "error",
      message: validationLogs.error.message,
    });
  }

  next();
};

module.exports = {
  createContactValidation: (req, res, next) => {
    return validate(schemaCreateContact, res, req.body, next);
  },
  updateContactValidation: (req, res, next) => {
    return validate(schemaUpdateContact, res, req.body, next);
  },
};
