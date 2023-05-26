const Joi = require("joi");

const phoneRegexp = /^(\+\d{1,3}\s?)?(\(\d{1,3}\)\s?)?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/;

const contactValidationSchema = Joi.object({
  name: Joi.string().required("field name is required"),
  email: Joi.string().email().required("field email is required"),
  phone: Joi.string().regex(phoneRegexp).required("field phone is required"),
  favorite: Joi.boolean(),
})

const updateContactValidationSchema = Joi.object()
  .keys({
    name: contactValidationSchema.extract('name').optional(),
    email: contactValidationSchema.extract('email').optional(),
    phone: contactValidationSchema.extract('phone').optional(),
    favorite: contactValidationSchema.extract('favorite').optional(),
  })
  .or('name', 'email', 'phone', 'favorite');

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required("missing field favorite"),
})

module.exports = {
  contactValidationSchema, 
  updateContactValidationSchema, 
  updateFavoriteSchema
}