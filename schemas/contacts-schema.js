import Joi from 'joi';

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `'name' must be exist`,
  }),
  email: Joi.string().required(),
  phone: Joi.string().required().messages({
    'any.required': `'number' must be exist`,
  }),
});

export default {
  contactsAddSchema,
};
