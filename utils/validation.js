const Joi = require('joi');

const NUMBER_REGEXP = /\+?\d{1,4}?[-\d\s]?\(?\d{1,3}?\)?[-\d\s]?\d{1,4}[-\d\s]?\d{1,4}[-\d\s]?\d{1,9}/;
const NUMBERS_ONLY_REGEXP = /^\+?[\d\s-()]*$/;

const validation = {
    addSchema: Joi.object({
        name: Joi.string().min(3).trim().required(),
        email: Joi.string().trim().required(),
        phone: Joi.string().pattern(NUMBER_REGEXP, {name: "valid phone number"}).pattern(NUMBERS_ONLY_REGEXP, {name: "numbers and special symbols"}).trim().required(),
    }),

    updateSchema: Joi.object({
        name: Joi.string().min(3).trim(),
        email: Joi.string().email().trim(),
        phone: Joi.string().pattern(NUMBER_REGEXP, {name: "valid phone number"}).pattern(NUMBERS_ONLY_REGEXP, {name: "numbers and special symbols"}).trim(),
}).min(1),
};

module.exports = validation;