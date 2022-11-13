const Joi = require('joi');
const { Schema, model } = require('mongoose');
const myCustomJoi = Joi.extend(require('joi-phone-number'));



const schemaPut = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    email: Joi.string()
        .email()
        .max(30)
        .min(5),
    phone: myCustomJoi.string().phoneNumber().min(7).max(15),
    id: Joi.valid()
})

const schemaPost = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .required()
        .email()
        .max(30)
        .min(5),
    phone: myCustomJoi.string().phoneNumber().min(7).max(15),
})

const ContactSchema = new Schema({
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
})

const Contact = model('contact', ContactSchema)


module.exports = {
    schemaPost,
    schemaPut,
    Contact,
}