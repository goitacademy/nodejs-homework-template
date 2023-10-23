import Joi from "joi";

export const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().min(5).max(30).required(),
  phone: Joi.number().integer().required(),
});
export const updateSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().min(5).max(30),
  phone: Joi.number().integer(),
});
