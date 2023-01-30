import Joi from "joi";

export const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  number: Joi.string().required(),
});
