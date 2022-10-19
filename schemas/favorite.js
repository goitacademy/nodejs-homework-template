const Joi = require("joi");

const updateFavoriteSchema = Joi.object().keys({
  favorite: Joi.boolean().required().messages({
    "boolean.base": `"favorite" should be a type of 'Boolean'`,
    "boolean.required": `"favorite" is a required field`,
  }),
});

module.exports = updateFavoriteSchema;
