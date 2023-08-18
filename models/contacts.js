const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const contactSchema = new Schema(
    {
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
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const schemaPost = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().default(false),
});

const schemaPut = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean().default(false),
}).or('name', 'email', 'phone', 'favorite');

const schemaUpdateFavorite = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemas = {
    schemaPut,
    schemaPost,
    schemaUpdateFavorite,
};

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    schemas,
};
