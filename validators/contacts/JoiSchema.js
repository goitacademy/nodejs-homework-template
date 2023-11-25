import Joi from "joi";

export const JoiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.required(),
  phone: Joi.required(),
});
