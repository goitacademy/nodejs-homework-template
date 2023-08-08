const Joi = require("joi");

const contactsSchemas = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

//     "name": "Allen Raymond",
// "email": "nulla.ante@vestibul.co.uk",
// "phone": "(992) 914-3792"

module.exports = contactsSchemas;
