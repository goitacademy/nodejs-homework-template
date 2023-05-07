const Joi = require("joi");
const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const addShemaFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {addShema,addShemaFavorite}