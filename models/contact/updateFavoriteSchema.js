const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports= updateFavoriteSchema