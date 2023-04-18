const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const contactsSchema = new Schema(
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
        }
    },
    { versionKey: false }
);

contactsSchema.post('save', handleMongooseError);

const Contact = model('contact', contactsSchema);

const addContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).trim().required()
        .messages({ 'any.required': 'missing required "name" field' }),
    email: Joi.string().min(3).max(30).trim().email().required()
        .messages({ 'any.required': 'missing required "email" field' }),
    phone: Joi.string().min(6).max(30).trim().required()
        .messages({ 'any.required': 'missing required "phone" field' }),
    favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).trim().label('Name'),
    email: Joi.string().min(3).max(30).trim().email().label('Email'),
    phone: Joi.string().min(6).max(30).trim().label('Phone Number'),
    favorite: Joi.boolean().label('Favorite')
});

const updateStatusSchema = Joi.object({
    favorite: Joi.boolean().required(),
}).messages({ 'any.required': 'missing field favorite' });

const schemas = {addContactSchema, updateContactSchema, updateStatusSchema}


module.exports = {Contact, schemas}