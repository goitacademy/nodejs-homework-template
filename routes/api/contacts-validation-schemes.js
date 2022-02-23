const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  email: Joi.string().min(3).max(20).required().email().required(),
  phone: Joi.string()
    .min(7)
    .max(12)
    .pattern(/^[0-9]+$/)
    .required(),
});

module.exports = { schema };
