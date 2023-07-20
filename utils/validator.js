const Joi = require("joi");

exports.addSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email(),
  phone: Joi.number().integer().required(),
});

