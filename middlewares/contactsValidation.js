const Joi = require('joi');

module.exports = {
  contactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
          .alphanum()
          .min(3)
          .max(30)
          .required(),
      phone: Joi.string()
          .length(10)
          .pattern(/^[0-9]+$/)
          .required(),
      email: Joi.string()
          .email()
          .required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.details[0].message});
    }
    next();
  },
};
