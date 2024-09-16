const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const nameRegexp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneRegexp = /^((\+)?(3)?(8)?[- ]?)?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{2}[- ]?\d{2}$/;

const contactSchema = new Schema({
    name: {
        type: String,
        match: nameRegexp,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
    },
    phone: {
        type: String,
        match: phoneRegexp,
        required: [true, 'Set phone for contact'],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, 
{ versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string().min(3).max(30).pattern(nameRegexp).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(phoneRegexp).required(),
    favorite: Joi.boolean().required(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
});

const schemas = { 
    addSchema,
    updateFavoriteSchema
};

const Contact = model('contact', contactSchema);

module.exports = { 
    Contact, 
    schemas 
};