import Joi from "joi";

export const queryGetContactsSchema = Joi.object({
  page: Joi.number().min(1).messages({
    "number.min": "Must be greater than or equal to 1",
    "number.base": "Page must be number",
  }),
  limit: Joi.number().min(1).messages({
    "number.min": "Must be greater than or equal to 1",
    "number.base": "Page must be number",
  }),
  favorite: Joi.boolean().messages({
    "boolean.base": "Favorite must be boolean",
  }),
});
