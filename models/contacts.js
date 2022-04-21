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
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, {versionKey: false,timestamps:true});

const joiSchema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().min(3).max(30).required().email().required(),
    phone: Joi.string()
        .min(7)
        .max(12)
        .pattern(/^[0-9]+$/)
        .required(),
    favorite: Joi.bool().default(false),
    // owner: Joi.string().required()
});

const favoriteSchema = Joi.object({
    favorite: Joi.bool().required()
})

const contact = model('contacts',contactSchema)

module.exports = {contact,joiSchema,favoriteSchema}