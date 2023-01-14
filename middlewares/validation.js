const Joi = require("joi");

module.exports = {
  postContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string().alphanum().min(10).max(400).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult === error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },
  putValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string().alphanum().min(10).max(400).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult === error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },
};
