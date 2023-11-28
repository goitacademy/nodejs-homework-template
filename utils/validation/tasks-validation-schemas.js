const Joi = require("joi");

const addContactValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().min(2).max(30).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateContactValidationSchema = Joi.object()
  .keys({
    name: addContactValidationSchema.extract("name").optional(),
    email: addContactValidationSchema.extract("email").optional(),
    phone: addContactValidationSchema.extract("phone").optional(),
  })
  .or("name", "email", "phone");

module.exports = {
  addContactValidationSchema,
  updateContactValidationSchema,
};
