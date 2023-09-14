import Joi from "joi";

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": 'The "name" field is required.',
    "string.empty": 'The "name" field cannot be empty.',
  }),
  email: Joi.string().required().messages({
    "any.required": 'The "email" field is required.',
    "string.empty": 'The "email" field cannot be empty.',
  }),
  phone: Joi.string().required().messages({
    "any.required": 'The "phone" field is required.',
    "string.empty": 'The "phone" field cannot be empty.',
  }),
  favorite: Joi.boolean(),
});
const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});
const favoriteUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export default { contactAddSchema, contactUpdateSchema, favoriteUpdateSchema };
