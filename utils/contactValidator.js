const Joi = require('joi');

exports.createContactValidator = data =>
    Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        favorite: Joi.bool(),
    }).validate(data);

exports.updateContactValidator = data =>
    Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        phone: Joi.string(),
        favorite: Joi.bool(),
    }).validate(data);

exports.updateFavoriteSchema = () =>
    Joi.object({
        favorite: Joi.bool.require,
    });
