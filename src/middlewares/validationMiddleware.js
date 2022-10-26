const Joi = require('joi');

const handleValidationError = (validationResult, res) => {
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details });
  }
};

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .pattern(/^\w+(?:\s+\w+)*$/)
        .min(3)
        .max(40)
        .required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
      phone: Joi.string().alphanum().min(3).max(30).required(),
    });

    const validation = schema.validate(req.body);

    handleValidationError(validation, res);
    next();
  },
  updateContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .pattern(/^\w+(?:\s+\w+)*$/)
        .min(3)
        .max(40)
        .required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
      phone: Joi.string().alphanum().min(3).max(30).required(),
    });

    const validation = schema.validate(req.body);

    handleValidationError(validation, res);
    next();
  },
};
