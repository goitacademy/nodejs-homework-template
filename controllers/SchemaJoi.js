import Joi from "joi";

export const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
});

export const contactsUpdateSchema = Joi.object({
  name: Joi.string().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().messages({
    "any.required": `missing required name field`,
  }),
  phone: Joi.string().messages({
    "any.required": `missing required name field`,
  }),
});
export default contactsAddSchema