const Joi = require("joi");
const {emailRegexp, subscriptionList} = require('../constatns/users')

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

const userRegisterValidation = Joi.object({
  password: Joi.string().required("Enter password"),
  email: Joi.string().pattern(emailRegexp).required("Enter valid email"),
  subscription: Joi.string().valid(...subscriptionList)
})

const userLoginValidation = Joi.object({
   password: Joi.string().required("Enter password"),
  email: Joi.string().pattern(emailRegexp).required("Enter valid email"),
})

module.exports = {
  validationSchema,
  updateContactValidation,
  isFavoriteValid,
  userRegisterValidation,
  userLoginValidation,
};
