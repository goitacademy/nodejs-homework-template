const { Schema, model } = require('mongoose');
const { handleSaveErrors } = require('../helpers');

const Joi = require('joi');

const contactsSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
            minLength: [3, 'Must be at least 3 letters, your value: {VALUE}'],
        },
        email: {
            type: String,
            required: [true, 'Set email for contact'],
        },
        phone: {
            type: String,
            required: [true, 'Set phone for contact'],
            minLength: [6, 'Must be at least 6 numbers, your value: {VALUE}'],
        },
        favorite: {
            type: Boolean,
            default: false,
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },

    { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
};

contactsSchema.post('save', handleSaveErrors);

const Contact = model('contact', contactsSchema);

module.exports = { Contact, schemas };
