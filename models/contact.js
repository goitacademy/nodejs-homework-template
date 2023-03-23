const {Schema, model} = require('mongoose');

const Joi = require("joi");


// Схема модели для коллекции
const contactSchema = new Schema({
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
}, {versionKey: false, timestamps: true});


const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
});


const joiSchemaFavorite = Joi.object({
    favorite: Joi.boolean().required()
});


const Contact = model("Contact", contactSchema);


module.exports = {
    Contact,
    joiSchema,
    joiSchemaFavorite


}