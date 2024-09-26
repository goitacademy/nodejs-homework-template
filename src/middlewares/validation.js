const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

const addContactValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
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
    name: Joi.string().min(3).max(20).required(),
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
  addContactValidation,
  updateContactValidation,
};
