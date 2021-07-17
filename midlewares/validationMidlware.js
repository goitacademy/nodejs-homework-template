const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(40).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(new RegExp("[0-9\t]{3,15}$")).required(),
      favorite: Joi.boolean(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },

  patchContactsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(4).max(29).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(new RegExp("[0-9\t]{3,15}$")).required(),
      favorite: Joi.boolean(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },
  patchStatusContactValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },
};
