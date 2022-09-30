const Joi = require("joi");

module.exports = {
  contactsValidation: (req, res, next) => {
    const contactSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(5).max(15).required(),
    });

    const validationData = contactSchema.validate(req.body);
    if (validationData.error) {
      return res.status(400).json({ status: validationData.error.details });
    }
    next();
  },
};
