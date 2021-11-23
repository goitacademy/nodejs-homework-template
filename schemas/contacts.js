/* eslint-disable quotes */
/* eslint-disable semi */

const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = contactSchema;
