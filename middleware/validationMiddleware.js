const Joi = require("joi");

module.exports = {
  validation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
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
      return res
        .status(400)
        .json({ message: `missing required ${error} field` });
    }
    next();
  },
  validationPatch: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30),
      phone: Joi.string().min(10).max(22),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      favorite: Joi.boolean().default(false),
    });

    const validateBody = schema.validate(req.body);
    const { error } = validateBody;
    console.log(validateBody);
    if (error) {
      return res
        .status(400)
        .json({ message: `missing required ${error} field` });
    }
    next();
  },
};
