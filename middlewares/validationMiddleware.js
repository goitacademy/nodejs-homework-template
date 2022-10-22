const Joi = require("joi");


module.exports = {
  schemaValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).alphanum().required(),

      phone: Joi.string()
        .pattern(/^[0-9-]+$/)
        .max(12)
        .required(),

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