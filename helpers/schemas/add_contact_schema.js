const Joi = require("joi");

const add_contact_schema = Joi.object({
  name: Joi.string().min(1).max(30).required(),

  email: Joi.string().min(1).max(30).required(),
  phone: Joi.string().min(1).max(30).required(),
});

module.exports = {
  add_contact_schema,
};
