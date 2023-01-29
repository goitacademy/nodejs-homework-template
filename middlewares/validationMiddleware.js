const Joi = require("joi");
module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
    //   favorite: Joi.boolean().required(),
      name: Joi.string().min(3).max(30).required(),
      phone: Joi.string()
        .regex(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)
        .max(15)
        .required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        status: validationResult.error.details,
        message: "missing required name field",
      });
    }
    next();
  },
  favoriteValidation: (req, res, next) => {
    const favoriteSchema = Joi.object({
      favorite: Joi.boolean().required(),
    });
    const validationResult = favoriteSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        status: validationResult.error.details,
        message: "missing required name field",
      });
    }
    next();
  },
};
