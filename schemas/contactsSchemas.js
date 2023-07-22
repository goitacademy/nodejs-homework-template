import Joi from 'joi';

// ####################################################

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).required().messages({
    'any.required': '"Phone" is a required field',
  }),
});

export default { contactsAddSchema };
