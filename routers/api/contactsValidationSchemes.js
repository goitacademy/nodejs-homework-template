const Joi = require('joi');

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'Поле name обязательное',
    'string.empty': 'Поле name не может быть пустым',
  }),
  email: Joi.string().min(5).max(50).required().messages({
    'any.required': 'Поле email обязательное',
    'string.empty': 'Поле email не может быть пустым',
  }),
  phone: Joi.string()
    .pattern(/[0-9]+/)
    .min(9)
    .max(20)
    .required()
    .messages({
      'any.optional': 'Поле phone не обязательное',
      'string.empty': 'Поле phone не может быть пустым',
    }),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional().messages({
    'any.optional': 'Поле name не обязательное',
    'string.empty': 'Поле name не может быть пустым',
  }),
  email: Joi.string().min(5).max(50).optional().messages({
    'any.optional': 'Поле email не обязательное',
    'string.empty': 'Поле email не может быть пустым',
  }),
  phone: Joi.string()
    .pattern(/[0-9]+/)
    .optional()
    .messages({
      'any.optional': 'Поле phone не обязательное',
      'string.empty': 'Поле phone не может быть пустым',
    }),
});

// const schemaAddContactValidation = (req, res, next) => {
//   const schema = Joi.object({
//     name: Joi.string().alphanum().min(3).max(30).required(),
//     email: Joi.string().alphanum().min(5).max(500).required(),
//     phone: Joi.string().alphanum().min(5).max(500).required(),
//   });
//   const isValid = schema.validate(req.body);
//   if (isValid.error) {
//     return res.status(400).json({ status: isValid.error.details });
//   }
//   next();
// };

// const schemaUpdateContactValidation = (req, res, next) => {
//   const schema = Joi.object({
//     name: Joi.string().alphanum().min(3).max(30).optional(),
//     email: Joi.string().alphanum().min(5).max(500).optional(),
//     phone: Joi.string().alphanum().min(5).max(500).optional(),
//   });
//   const isValid = schema.validate(req.body);
//   if (isValid.error) {
//     return res.status(400).json({ status: isValid.error.details });
//   }
//   next();
// };

module.exports = { schemaCreateContact, schemaUpdateContact };
