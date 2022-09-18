const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string().alphanum().min(5).max(12).required(),
    });
    const validateBody = schema.validate(req.body);
    if (validateBody.error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    next();
  },
  putContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string().alphanum().min(5).max(12).required(),
    });
    const validatePutBody = schema.validate(req.body);
    if (validatePutBody.error) {
      return res.status(400).json({ message: "missing fields" });
    }
    next();
  },
};
