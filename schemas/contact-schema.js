import Joi from "joi";

export const contactAddSchema = Joi.object({
    name: Joi.string().required()
      .messages({ "any.required": "Missing required name field" }),
    email: Joi.string().required()
      .messages({ "any.required": "Missing required email field" }),
    phone: Joi.string().required()
      .messages({ "any.required": "Missing required phone field" }),
  });

export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string()
})

export const isEmptySchema = Joi.object().min(1);