const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().regex(/^\d+$/).required(),
  });

  module.exports = {
    addSchema,
  }