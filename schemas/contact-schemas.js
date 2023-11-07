/** @format */

import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" must be exist`,
    "string.base": `"name" must be string`,
  }),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

// export const contactUpdateSchema = Joi.object({
//   name: Joi.string(),
//   email: Joi.string(),
//   phone: Joi.number(),
// });
