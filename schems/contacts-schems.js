const Joi = require("joi");

const addContactChema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `missing required "name" field` }), // 1-09 //
  email: Joi.string()
    .required()
    .messages({ "any.required": `missing required "email" field` }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": `missing required "phone" field` }),
});

const updateContactChema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = {
  addContactChema,
  updateContactChema,
};
