import Joi from "joi";
import { VALIDATION } from "../constants/index.js";

const { name, phone, email } = VALIDATION;

const schemeObject = {
  name: Joi.string()
    .pattern(name.pattern)
    .messages({ "string.pattern.base": name.message })
    .required(),

  phone: Joi.string()
    .pattern(phone.pattern)
    .messages({ "string.pattern.base": phone.message })
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .messages({ "string.email": email.message })
    .required(),

  favorite: Joi.boolean().default(false),
};

export const contactAddSchema = Joi.object(schemeObject);

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
