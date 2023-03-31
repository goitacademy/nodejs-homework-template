const Joi = require("joi");

module.exports = {
  putValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.number().integer(),
    });

    const validationResult = schema.validateAsync(req.body);

    if (validationResult.error) {
      return res
        .status(400)
        .json({
          message:
            "Validation error: check syntax of input text or missing fields",
        });
    }
    next();
  },

  patchValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.number().integer(),
    });

    const validationResult = schema.validateAsync(req.body);

    if (validationResult.error) {
      return res
        .status(400)
        .json({
          message:
            "Validation error: check syntax of input text or missing fields",
        });
    }
    next();
  },
};