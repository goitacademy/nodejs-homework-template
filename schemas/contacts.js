const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `Missing required name field`,
  }),

  email: Joi.string().required().messages({
    "any.required": `Missing required email field`,
  }),

  phone: Joi.string().required().messages({
    "any.required": `Missing required phone field`,
  }),

  favorite: Joi.boolean().optional(),
});
const addShemaPut = Joi.object({
  name: Joi.string(),

  email: Joi.string(),

  phone: Joi.string(),

  favorite: Joi.boolean().optional(),
});
module.exports = {
  addShema,
  addShemaPut,
};
