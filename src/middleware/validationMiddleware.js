const Joi = require("joi");

module.exports = {
  contactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      phone: Joi.string().min(10).max(16).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      favorite: Joi.boolean().default(false),
    });

    const validationResult = schema.validate(req.body);
    const { error } = validationResult;
    if (error) {
      return res.status(400).json({ message: `missing required ${error}` });
    }
    next();
  },
};
