const Joi = require("joi");
const { ValidateError } = require("../helpers/errors");

module.exports = {
  validation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      phone: Joi.string().min(10).max(22).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      favorite: Joi.boolean().default(false),
    });

    const validateBody = schema.validate(req.body);
    const { error } = validateBody;
    if (error) {
      next(new ValidateError(error.details));
    }
    next();
  },
  validateAuth: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string().alphanum().min(7).max(15).required(),
    });

    const validateBody = schema.validate(req.body);
    const { error } = validateBody;
    if (error) {
      return res
        .status(400)
        .json({ message: `missing required ${error} field` });
    }

    next();
  },
};
