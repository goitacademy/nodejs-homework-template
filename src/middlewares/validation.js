const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

const authValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    password: Joi.string().min(8).max(30).pattern(/[A-Z]/).required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }

  next();
};

const addContactValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^[^0-9]+$/)
      .min(3)
      .max(20)
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    phone: Joi.string()
      .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
      .required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }

  next();
};

const updateContactValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^[^0-9]+$/)
      .min(3)
      .max(20)
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    phone: Joi.string()
      .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
      .required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }

  next();
};

module.exports = {
  authValidation,
  addContactValidation,
  updateContactValidation,
};
