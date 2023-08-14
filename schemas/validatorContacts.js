const joi = require('joi');

const addSchema = joi.object({
	name: joi.string().min(3).required(),
	email: joi.string().email().required(),
	phone: joi.string().min(5).required(),
	favorite: joi.boolean(),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean().required(),
});

const schemas = { addSchema, updateFavoriteSchema };


module.exports = {
	// addSchema,
	// updateFavoriteSchema,
	schemas
}