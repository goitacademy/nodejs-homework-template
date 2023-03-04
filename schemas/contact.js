const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(24).required(),
  email: Joi.string().min(4).max(64).required().email(),
  phone: Joi.string().min(6).max(24).required()
    .pattern(/^(\+3|)[0-9]{10,11}$/),
});

module.exports = contactSchema; 