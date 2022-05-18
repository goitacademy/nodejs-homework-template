const Joi = require("joi");

module.exports = {
  fullPostValidation: (req, res, next) => {
    const schemaValid = Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ca", "ua"] },
        })
        .required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean().optional(),
      owner: Joi.string().optional(),
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
      favorite: Joi.boolean(),
      owner: Joi.string().optional(),
    });

    const validationResult = schemaValid.validate(req.body);
    if (validationResult.error) {
      return res.status(404).json({ status: validationResult.error.details });
    }
    next();
  },
  patchStatusValidation: (req, res, next) => {
    const schemaValid = Joi.object({
      favorite: Joi.boolean().required(),
    });

    const validationResult = schemaValid.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "missing field favorite",
        status: validationResult.error.details,
      });
    }
    next();
  },
  postAuthValidation: (req, res, next) => {
    const schemaValid = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .optional(),
      password: Joi.string().required(),
      subscription: Joi.string().optional(),
    });

    const validationResult = schemaValid.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        contentType: "application/json",
        ResponseBody: validationResult.error.details,
      });
    }
    next();
  },
};
