import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `"name" must be text`,
  }),
  email: Joi.string().required().messages({}),
  phone: Joi.number().required().messages({
    "namber.base": `"name" must be number`,
  }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.number(),
});
