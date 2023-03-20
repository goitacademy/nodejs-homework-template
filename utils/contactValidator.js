const Joi = require('joi');

exports.createContactValidator = (data) => Joi.object()
.options({ abortEarly: false })
.keys({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
}).validate(data);


exports.updateContactValidator = (data) => Joi.object()
.options({ abortEarly: false })
.keys({
    name: Joi.string().min(3).max(20),
    email: Joi.string().email({ tlds: { allow: false } }),
    phone: Joi.string(),
    favorite: Joi.boolean(),
}).validate(data);


exports.updateFavoriteContactValidator = (data) => Joi.object()
.keys({
    favorite: Joi.boolean().required(),
}).validate(data);