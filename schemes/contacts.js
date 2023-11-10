const Joi = require("joi");

const addScheme = Joi.object({
    name: Joi.string().trim().alphanum().min(2).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).required(),
  });

  module.exports = { addScheme };