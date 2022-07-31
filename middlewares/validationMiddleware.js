const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(10).required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      res.status(400).json({ message: "missing required name field" });
    }
    next();
  },

  updateContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(10).required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },
};
