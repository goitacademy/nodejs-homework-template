const Joi = require("joi");
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});
const updateFavorite = Joi.object({ favorite: Joi.boolean().required() });
module.exports = {
  addSchema,
  updateFavorite,
};
