const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  schemaPostContact: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.number().integer().required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      next(new ValidationError(validationResult.error.message));
    }
    next();
  },

  schemaPutContact: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.number().integer(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      next(new ValidationError(validationResult.error.message));
    }
    next();
  },

  schemaFavorite: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      next(new ValidationError(validationResult.error.message));
    }
    next();
  },
};
