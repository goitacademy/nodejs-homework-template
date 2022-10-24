const Joi = require("joi");

module.exports = {
  schemaValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string().alphanum().min(5).required(),

      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    next();
  },
};