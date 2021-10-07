const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });

const contactJoiSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(1).email().required(),
    phone: Joi.string().min(1).required(),
    favorite: Joi.boolean()
});

const updateContactJoiSchema = Joi.object({
    name: Joi.string().min(1),
    email: Joi.string().min(1).email(),
    phone: Joi.string().min(1),
    favorite: Joi.boolean()
}).or('name', 'email', 'phone');

const updateFavoriteJoiSchema = Joi.object({
    favorite: Joi.boolean().required()
})

const Contact = model('contact', contactSchema);

module.exports = {
    contactJoiSchema,
    updateContactJoiSchema,
    updateFavoriteJoiSchema,
    Contact
}