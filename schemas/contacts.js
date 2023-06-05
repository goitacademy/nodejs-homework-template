const Joi = require("joi");

const phoneRegexp = /^(\d{3}) \d{3}-\d{2}-\d{2}$/;

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
});

module.exports = {
  contactAddSchema,
};
