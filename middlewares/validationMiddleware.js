const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .pattern(/^[a-zA-Z]+\s?[a-zA-Z]+$/)
        .min(3)
        .max(30)
        .required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "uk"] },
        })
        .required(),
      phone: Joi.string()
        .length(14)
        .pattern(/^(.)+[0-9]+(.)+\s+[0-9]+(.)+[0-9]$/)
        .required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    next();
  },
  changeContactByIdValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .pattern(/^[a-zA-Z]+\s?[a-zA-Z]+$/)
        .min(3)
        .max(30),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "uk"] },
      }),
      phone: Joi.string()
        .length(14)
        .pattern(/^(.)+[0-9]+(.)+\s+[0-9]+(.)+[0-9]$/),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    next();
  },
};
