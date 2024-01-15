import Joi from "joi";

export const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  }).messages({"any.required": "missing required {{#label}} field"})

  export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  })