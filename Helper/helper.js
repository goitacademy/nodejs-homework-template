const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Missing required name field',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Missing required email field',
    'string.email': 'Invalid email format',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'Missing required phone field',
  }),
});


const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    next();
  }
};

module.exports = {
  validateContact: validate(contactSchema),
};
