const Joi = require("joi");

module.exports = {
  addValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string().min(3).max(30).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    next();
  },
};
