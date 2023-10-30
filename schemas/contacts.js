const joi = require("joi");
const contactsSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required().email(),
  phone: joi.string().required(),
});

module.exports = contactsSchema;