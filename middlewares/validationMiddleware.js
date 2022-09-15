const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      phone: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ca", "uk"] },
        })
        .required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      const [{ context }] = validationResult.error.details;

      next(new ValidationError(`missing required ${context.label} field`));
    }

    next();
  },

  putContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      phone: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ca", "uk"] },
        })
        .required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      next(new ValidationError("missing fields"));
    }

    next();
  },
};
