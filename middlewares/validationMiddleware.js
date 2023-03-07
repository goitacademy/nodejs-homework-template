const Joi = require("joi");

module.exports = {
  postValidation: (req, res, next) => {
    const joiSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      phone: Joi.string().min(10).max(15).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "uk", "ua", "org"] },
        })
        .required(),
    });

    const { body } = req;

    const validationResult = joiSchema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    next();
  },

  putValidation: (req, res, next) => {
    const joiSchema = Joi.object({
      name: Joi.string().min(3).max(30).optional(),
      phone: Joi.string().min(10).max(15).optional(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "uk", "ua", "org"] },
        })
        .optional(),
    });

    const { body } = req;

    const validationResult = joiSchema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    next();
  },
};
