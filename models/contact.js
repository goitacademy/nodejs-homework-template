const { Schema, model } = require('mongoose');
const Joi = require('joi');
const {handleSaveError} = require('../helpers')

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
},
{
    versionKey: false,
    timestamps: true,
}
);

contactSchema.post("save", handleSaveError);

const addShema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
})

const updateShema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
})

const favoriteShema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addShema,
    updateShema,
    favoriteShema,
}

const Contact = model('contact', contactSchema);

module.exports = {Contact, schemas};