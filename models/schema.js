// models\schema.js
const Joi = require("joi");

const addContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContact = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
})
  .or("name", "email", "phone")
  .required();

module.exports = {
  addContact,
  updateContact,
};
