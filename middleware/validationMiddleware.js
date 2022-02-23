const Joi = require('joi');

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).max(10).required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^[0-9]+$/, 'numbers')
        .required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },
};
