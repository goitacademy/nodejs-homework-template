import Joi from "joi";

const contactSchema = Joi.object({
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
});

export default contactSchema;
