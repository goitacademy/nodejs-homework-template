const Joi = require('joi');
const { ValidationError } = require('../helpers/errors');

const handleValidationError = (validationResult, res, next) => {
  if (validationResult.error) {
    next(new ValidationError(JSON.stringify(validationResult.error.details)));
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
      phone: Joi.string()
        .min(3)
        .max(30)
        .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
        .required(),
      favorite: Joi.boolean(),
    });

    const validation = schema.validate(req.body);

    handleValidationError(validation, res, next);
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
      phone: Joi.string()
        .min(3)
        .max(30)
        .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
        .required(),
      favorite: Joi.boolean(),
    });

    const validation = schema.validate(req.body);

    handleValidationError(validation, res);
    next();
  },
};
