import Joi from "joi";

export const contactsAddSchema = Joi.object({
  name: Joi.string().required().min(3).max(30).messages({
    "any.required": `"name" must be exist`,
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "string.min": `"name" should have a minimum length of 3`,
  }),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .message({
      "any.required": `"email" is a required field`,
      "string.empty": `"email" cannot be an empty field`,
    }),

  phone: Joi.string()
    .required()
    .length(14)
    .pattern(/^[\d()+-]+$/)
    .message({
      "any.required": `"phone" is a required field`,
      "string.empty": `"phone" cannot be an empty field`,
    }),
});

export const contactsUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});
