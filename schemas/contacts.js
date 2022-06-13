import Joi from "joi";

export const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `Missing required name field`,
  }),
  number: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "any.required": `Missing required number field`,
    }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "com"] },
    })
    .required()
    .messages({
      "any.required": `Missing required email field`,
    }),
});
