import Joi from 'joi';

const contactsSchema = Joi.object({

  name:  Joi.string().required().messages({
    'any.required': 'missing required name field!!',
  }),
  email: Joi.string().required().messages({
    'any.required': 'missing required email field!',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'missing required phone field!',
  }),
});

export default contactsSchema
