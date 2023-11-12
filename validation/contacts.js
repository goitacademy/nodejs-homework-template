const Joi = require("joi");

function validateContact(contact) {
  const validationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  });

  return validationSchema.validate(contact);
}

function updateFavoriteSchema(contact) {
  const favoriteValidationSchema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  return favoriteValidationSchema.validate(contact);
}

module.exports = { validateContact, updateFavoriteSchema };
