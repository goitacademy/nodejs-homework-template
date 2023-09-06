const joi = require("joi");

const addContactValid = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.number().required(),
});

module.exports = addContactValid;
