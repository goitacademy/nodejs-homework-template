const Joi = require("joi");

const customMessages = {
  "any.required": `Missing required {{#label}} - field`,
};

const contactSchema = Joi.object({
  name: Joi.string().min(3).required().messages(customMessages),
  email: Joi.string().email().required().messages(customMessages),
  phone: Joi.string().required().messages(customMessages),
});

const favoriteFieldSchema= Joi.object({
  favorite: Joi.boolean().required().messages(customMessages),
});

module.exports = { contactSchema, favoriteFieldSchema};
