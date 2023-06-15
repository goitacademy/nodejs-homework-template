const joi = require("joi");
const contactAddSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.number().required(),
  });
  module.exports = {
    contactAddSchema,
  }