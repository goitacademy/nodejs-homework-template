const Joi = require('joi');

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),
      email: Joi.string()
        .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
        .required(),
      phone: Joi.string()
        .min(6) 
        .max(11)
        .required(),
      favorite: Joi.boolean()
        .optional(),
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

  addPutValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .min(3)
        .max(30)
        .optional(),
      email: Joi.string()
        .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
        .optional(),
      phone: Joi.string()
        .min(6) 
        .max(11)
        .optional(),
      favorite: Joi.boolean()
        .optional(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({status: validationResult.error.details});
    }

    next();
  },

  addPatchValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean()
        .required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({status: validationResult.error.details});
    }

    next();
  },
};
