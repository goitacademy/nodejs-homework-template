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

  patchFavouriteValidation: (req, res, next) => {
    const schema = Joi.object({
      favourite: Joi.boolean(),
    }).required();

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details));
    }
    next();
  },

  patchSubscriptionValidation: (req, res, next) => {
    const schema = Joi.object({
      subscription: Joi.string().valid("pro", "starter", "business").required(),
    }).required();

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details));
    }
    next();
  },
};
