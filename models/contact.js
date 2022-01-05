const { Schema, model } = require("mongoose");
const Joi = require('joi');

const regexPhoneNumber = /^[\s(]*\d{3}[)\s]* \d{3}-\d{4}$/

const contactSchema = Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 25,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        
    },
    phone: {
        type: String,
        match: regexPhoneNumber,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, {versionKey: false, timestamps: true});

const joiContactAddSchema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(regexPhoneNumber).required()
})

const joiContactUpdateSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string().min(3).max(25),
    email: Joi.string().email(),
    phone: Joi.string().regex(regexPhoneNumber)
}).min(1)

const joiContactUpdateIsFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
});

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    joiContactAddSchema,
    joiContactUpdateSchema,
    joiContactUpdateIsFavoriteSchema,
};