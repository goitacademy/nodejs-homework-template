const {Schema, model} = require('mongoose');
const Joi = require("joi");
const {handleSaveErrors} = require("../helpers");

const genders = ['male', 'female'];
const phoneRegexp = /^(\+?\d+)?\s*(\(\d+\))?[\s-]*([\d-]*)$/;

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
        unique: true,
    }, 
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],
        match: phoneRegexp,
        unique: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    gender: {
        type: String,
        enum: genders,
    },
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleSaveErrors); // Міняє статус помилки якщо не вірно внесені користувачем данні або якщо унікальні данні вже є

const addSchema = Joi.object({
    name: Joi.string()
            .min(5)
            .max(30)
            .required(),
    email: Joi.string()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net', 'org', 'ru', 'ua'] }
            })
            .pattern(
                /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
            )
            .required(),
    phone: Joi.string()
            .pattern(phoneRegexp)
            .required(),
    gender: Joi.string()
            .valid(...genders)
            .required(),
    favorite: Joi.boolean()
            .optional(),
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean()
            .required(),
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    schemas,
};