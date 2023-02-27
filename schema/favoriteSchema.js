const Joi = require("joi");
const updateFavoriteContact = Joi.object({
  favorite: Joi.bool().required(),
});
module.exports = { updateFavoriteContact };
