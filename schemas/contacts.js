const Joi = require("joi");
const myCustomJoi = Joi.extend(require('joi-phone-number'));

const contactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: myCustomJoi.string().phoneNumber().required(),
    email: Joi.string().email(),
    favorite: Joi.boolean(),
});
const favoriteContactSchema = Joi.object({
    favorite: Joi.boolean().required(),
});
module.exports = {
    contactSchema,
    favoriteContactSchema
}