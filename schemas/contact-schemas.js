import Joi from 'joi';

export const contactAddSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": ` "title" is a required field `
  }),
  director: Joi.string().required(),

})
export const contactUpdateSchema = Joi.object({
  title: Joi.string(),
  director: Joi.string(),

})