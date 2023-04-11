const Joi = require("joi");

const schema = (data) =>
  Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
  }).validate(data);

const updateAfterChangeContact = (data) =>
  Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  }).validate(data);

module.exports = { schema, updateAfterChangeContact };
