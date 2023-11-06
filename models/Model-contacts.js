import { Schema, model } from 'mongoose';
import Joi from "joi";
import { handlerSaveError, runValidatorsAtUpdate } from '../models/hooks.js';

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],

    },
    favorite: {
        type: Boolean,
        default: false,
    },
})

export const ModelContacts = model('contact', contactSchema);
contactSchema.post('save', handlerSaveError);
contactSchema.post('findOneAndUpdate', handlerSaveError);
contactSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);


export const contactsSchema = Joi.object({
    name: Joi.string().required().min(3).max(50).messages({
        "any.required": `missing required name field`
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        "any.required": `missing required email field`
    }),
    phone: Joi.number().required().messages({
        "any.required": `missing required phone field`
    }),
    favorite: Joi.boolean(),
})
export const contactsSchemaFavorite = Joi.object({
    favorite: Joi.boolean().required(),
})