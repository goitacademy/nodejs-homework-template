const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/).messages({'string.pattern.base': `Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`}).required(),
favorite: Joi.boolean(),
});

module.exports = addSchema;