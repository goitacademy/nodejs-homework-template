const Joi = require("joi");

// Data validation ==========================================

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(
      /^(?:\+\d{1,3})?(?:\(?\d{2,3}\)?[-\s]?)?\d{2,4}(?:[-\s]?\d{2,4}){2}$/
    )
    .required(),
});

module.exports = {
  contactSchema,
};
