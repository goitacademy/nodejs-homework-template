const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]+$/).required(), 
  favorite: Joi.boolean(),
});

module.exports = {
  contactSchema,
};
