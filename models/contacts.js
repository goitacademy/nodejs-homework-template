const {Schema , model} = require('mongoose')
const Joi = require("joi");

const contactSchema = new Schema( {
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
}, {versionKey: false,timestamps:true});

const joiSchema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().min(3).max(20).required().email().required(),
    phone: Joi.string()
        .min(7)
        .max(12)
        .pattern(/^[0-9]+$/)
        .required(),
    favorite: Joi.bool().default(false)
});

const favoriteShcema = Joi.object({
    favorite: Joi.bool().required()
})

const contact = model('contacts',contactSchema)

module.exports = {contact,joiSchema,favoriteShcema}