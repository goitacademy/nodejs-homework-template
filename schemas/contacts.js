const Joi = require("joi");
const {emailRegexp, phoneRedexp} = require('../helpers/regExp');

const newContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().pattern(phoneRedexp).required(),
    email: Joi.string().pattern(emailRegexp),
    favorite: Joi.boolean(),
});
const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    phone: Joi.string().pattern(phoneRedexp),
    email: Joi.string().pattern(emailRegexp),
    favorite: Joi.boolean(),
});
const favoriteContactSchema = Joi.object({
    favorite: Joi.boolean().required(),
});
module.exports = {
    newContactSchema,
    updateContactSchema,
    favoriteContactSchema
}