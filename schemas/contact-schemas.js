import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "any.required": `"name" must be exist`,
    "string.base": `"name" must be text`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": `"email" must be exist`,
    }),
  phone: Joi.number().min(7).required().messages({
    "any.required": `"phone" must be exist`,
    "number.base": `"phone" must be number`,
  }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(2).messages({ "string.base": `"name" must be text` }),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().min(7).messages({
    "number.base": `"phone" must be number`,
  }),
});
