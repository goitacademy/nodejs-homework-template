import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
      "any.required": `"name" required field`
  }),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
})