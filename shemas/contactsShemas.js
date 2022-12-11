const Joi = require("joi");

const comtactsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().min(5).max(12).required(),
  });

  module.exports = comtactsSchema;