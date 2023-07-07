const Joi = require("joi");

const contactSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object().keys({
  favorite: Joi.boolean().required(),
});
const schema = {
  contactSchema,
  updateFavoriteSchema,
};

module.exports = schema;
