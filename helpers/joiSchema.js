const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().required().alphanum().messages({
    "any.required": `missing required phone field`,
  }),
  favorite: Joi.bool(),
});



module.exports = { schema };
