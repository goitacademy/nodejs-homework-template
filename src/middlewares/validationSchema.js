const Joi = require("joi");

module.exports = {
  addPostValidation: (req, res, next) => {
    const schemaValid = Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ca", "ua"] },
        })
        .required(),
      phone: Joi.string().required(),
    });

    const validationResult = schemaValid.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "missing required name field",
        status: validationResult.error.details,
      });
    }
    next();
  },

  patchValidation: (req, res, next) => {
    const schemaValid = Joi.object({
      name: Joi.string().optional(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .optional(),
      phone: Joi.string(),
    });

    const validationResult = schemaValid.validate(req.body);
    if (validationResult.error) {
      return res.status(404).json({ status: validationResult.error.details });
    }
    next();
  },
};
