const Joi = require("joi");
const { ValidationError } = require("../Helpers/errors");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(10).required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details));
    }
    next();
  },

  updateContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(10).required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details));
    }
    next();
  },
};
