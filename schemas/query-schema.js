import Joi from "joi";

export const queryGetContactsSchema = Joi.object({
  page: Joi.number().min(1).messages({
    "number.min": "Must be greater than or equal to 1",
  }),
  limit: Joi.number().min(1).messages({
    "number.min": "Must be greater than or equal to 1",
  }),
});
