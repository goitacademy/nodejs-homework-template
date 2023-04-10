const Joi = require('joi');

const updateFavoriteDataValidator = (data) => Joi.object({
  favorite: Joi.boolean().required()
}).validate(data);

module.exports = updateFavoriteDataValidator;