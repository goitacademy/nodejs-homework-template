const Joi = require("joi");

const contactShema = Joi.object().keys({
  name: Joi.string().min(3).required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = { contactShema };
