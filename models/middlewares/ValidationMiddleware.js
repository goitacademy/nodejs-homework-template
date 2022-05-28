const Joi = require("joi");

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(15).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string().required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(JSON.stringify(validationResult.error.details)));
    }
    next();
  },
};
