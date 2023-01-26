const Joi = require("joi");
const { ValidationError } = require("../helpers");

module.exports = {
  postValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(10).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      phone: Joi.string().alphanum().min(3).max(10).required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      next(ValidationError(validationResult.error.details));
    }
    next();
  },

  patchValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(10).optional(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .optional(),
      phone: Joi.string().alphanum().min(3).max(10).optional(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        status: validationResult.error.details,
        message: `missing required field`,
      });
    }
    next();
  },
};
