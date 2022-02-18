const Joi = require('joi');
const { isValidObjectId } = require("mongoose");

exports.createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
})
exports.updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string()
})
exports.updateFavoriteContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.bool().required()
})

exports.idScheme = Joi.object({
    id: Joi.custom((value, helpers) => {
        if (!isValidObjectId(value)) {
            return helpers.error("invalid MongoDB ObjectID");
        }

        return value;
    }).required(),
});