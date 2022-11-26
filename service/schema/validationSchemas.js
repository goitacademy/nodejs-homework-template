const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Name is required",
    "string.empty": "No empty field",
    "string.min": "Name is 3 symbols min lenght",
    "string.max": "Name is 30 symbols max lenght",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.empty": "No empty fields",
    "string.email": "Enter vaild email",
  }),

  phone: Joi.string()
    .pattern(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/)
    .required()
    .messages({
      "any.required": "Phone is required",
      "string.empty": "No empty fields",
      "object.pattern.match": "Enter valid phone number",
    }),
  favorite: Joi.boolean(),
});
const schemaPasswordValidation = Joi.object({
  email: Joi.string().required().email().messages({
    "string.email": "Email is required",
  }),
  password: JoiPassword.string().min(4).noWhiteSpaces().required().messages({
    password: "Minimum 4 letter in password",
    "password.noWhiteSpaces": "{#label} should not contain white spaces",
  }),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Name is required",
    "string.empty": "No empty field",
    "string.min": "Name is 3 symbols min lenght",
    "string.max": "Name is 30 symbols max lenght",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.empty": "No empty fields",
    "string.email": "Enter vaild email",
  }),

  phone: Joi.string()
    .pattern(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/)
    .required()
    .messages({
      "any.required": "Phone is required",
      "string.empty": "No empty fields",
      "object.pattern.match": "Enter valid phone number",
    }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Missing field favorite",
  }),
});

const schemaMongoId = Joi.object({
  contactId: Joi.objectId().required(),
});

module.exports = {
  schemaCreateContact,
  schemaUpdateContact,
  updateFavoriteSchema,
  schemaPasswordValidation,
  schemaMongoId,
};
