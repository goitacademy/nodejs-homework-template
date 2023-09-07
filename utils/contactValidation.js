const joi = require("joi");

const addContactValid = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.number().required(),
});

const contactChangeSchema = joi
  .object({
    name: joi.string(),
    email: joi.string(),
    phone: joi.string(),
  })
  .min(1);

module.exports = { addContactValid, contactChangeSchema };
