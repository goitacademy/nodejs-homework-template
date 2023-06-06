const Joi = require("joi");

const validationSchema = Joi.object({
  name: Joi.string().trim().required('Field "Name" should not be empty'),
  email: Joi.string()
    .trim()
    .email()
    .required('Field "Email" should not be empty'),
  phone: Joi.string().trim().required('Field "Phone" should not be empty'),
  favorite: Joi.boolean().required(),
});

const updateContactValidation = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().trim(),
  phone: Joi.string().trim(),
  favorite: Joi.boolean().default(false),
});

const isFavoriteValid = Joi.object({
   favorite: Joi.boolean()
})

module.exports = {
  validationSchema,
  updateContactValidation,
  isFavoriteValid,
};
