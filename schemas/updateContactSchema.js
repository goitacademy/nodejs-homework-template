const Joi = require("joi");

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  owner: Joi.string(),
  favorite: Joi.boolean(),
});

module.exports = {
  updateContactSchema,
};
