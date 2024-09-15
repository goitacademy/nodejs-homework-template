import joi from "joi";
import { emailRegexp, phoneRegex } from "../constans/contacts-constans.js";

const contactSchemaJoi = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email format must be - example@example.com",
  }),
  phone: joi.string().pattern(phoneRegex).required().messages({
    "string.pattern.base": "Phone format must be - max 10 characters",
  }),
  favorite: joi.boolean().default(false),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean().required(),
});

export default {
  contactSchemaJoi,
  updateFavoriteSchema,
};
