const Joi = require("joi");

const contactAddSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(3).max(18).pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/).required(),
  });

  module.exports = contactAddSchema;
  