const Joi = require("joi");

const phoneRegexp = /^(\+\d{1,3}\s?)?(\(\d{1,3}\)\s?)?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/;

const contactValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(phoneRegexp).required(),
})

module.exports = {contactValidationSchema}