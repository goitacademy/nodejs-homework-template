const { Schema, model, SchemaTypes } = require('mongoose');
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
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
    }
}, { versionKey: false, timestamps: true });

const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
});

const favoriteJoiSchema = Joi.object({
    favorite: Joi.boolean().required()
})

const Contact = model('Contact', contactSchema, 'contacts');

module.exports = { Contact, joiSchema, favoriteJoiSchema };