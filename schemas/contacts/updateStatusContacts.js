const Joi = require("joi");

const updateStatusContacts = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = updateStatusContacts;
