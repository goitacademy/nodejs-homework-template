const Joi = require("joi");

module.exports = {
  contactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().email(),
      phone: Joi.string()
        .pattern(/^[+0-9]+$/)
        .required(),
      favorite: Joi.bool(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error });
    }

    next();
  },
};
