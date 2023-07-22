import Joi from "joi";

export const contactsAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      allowFullyQualified: true,
    })
    .required()
    .messages({
      "any.required": `missing required email field`,
    }),
  phone: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/, "phone number")
    .min(2)
    .max(20)
    .required()
    .messages({
      "any.required": `missing required phone field`,
    }),
  favorite: Joi.boolean(),
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  }),
});

