const Joi = require("joi");

module.exports = {
  contactsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(4).max(20).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.number().integer().required(),
    });
    const validationEffect = schema.validate(req.body);

    if (validationEffect.error) {
      return res.status(400).json({ message: "missing fields" });
    }
    next();
  },
};
