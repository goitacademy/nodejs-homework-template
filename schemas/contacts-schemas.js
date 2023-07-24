import Joi from "joi";

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `name should be a type of 'text'`,
    "string.empty": `name cannot be an empty field`,
    "any.required": `missing required name field`,
  }),
  phone: Joi.string().required().messages({
    "string.base": `phone should be a type of 'text'`,
    "string.empty": `phone cannot be an empty field`,
    "any.required": `missing required phone field`,
  }),
  email: Joi.string().required().messages({
    "string.base": `email should be a type of 'text'`,
    "string.empty": `email cannot be an empty field`,
    "any.required": `missing required email field`,
  }),
});

export default contactsAddSchema;
