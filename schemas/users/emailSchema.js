const Joi = require('joi');

const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
});

module.exports = emailSchema;
