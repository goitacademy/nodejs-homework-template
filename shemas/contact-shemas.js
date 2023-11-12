import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .pattern(/^([a-zA-Z]|\s)*$/)
    .required()
    .messages({
      "string.base": '"Name" should be a type of "text"',
      "any.required": `missing required name field`,
      "string.pattern.base": '"Name" must contains only latters',
    }),
  email: Joi.string().email().required().messages({
    "any.required": `missing required name field`,
  }),
  phone: Joi.string()
    .pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)
    .required()
    .messages({
      "any.required": `missing required phone field`,
      "string.pattern.base": '"Phone" must be like (111) 111-1111',
    }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .pattern(/^([a-zA-Z]|\s)*$/)
    .messages({
      "string.base": '"Name" should be a type of "text"',
      "string.pattern.base": '"Name" must contains only latters',
    }),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)
    .messages({
      "string.pattern.base": '"Phone" must be like (111) 111-1111',
    }),
});
