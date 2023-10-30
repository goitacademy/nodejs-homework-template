import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `'name' cannot be an empty field`,
    "any.required": `missing required 'name' field`,
  }),
  phone: Joi.string().required().messages({
    "string.empty": `'phone' cannot be an empty field`,
    "any.required": `missing required 'phone' field`,
  }),
  email: Joi.string().required().messages({
    "string.empty": `'email' cannot be an empty field`,
    "any.required": `missing required 'email' field`,
  }),
});
