const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  contactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^[+0-9]+$/)
        .required(),
      favorite: Joi.bool(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message);
    }

    next();
  },

  favoriteValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.bool().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message);
    }

    next();
  },
};
