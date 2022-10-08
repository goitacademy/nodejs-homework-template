const {Schema, model} = require('mongoose');
const {handleSaveErrors} = require('../helpers');
const Joi = require("joi");

const contactSchema = new Schema({    
    name: {
       type: String,
       required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 12,
    },
    favorite: {
        type: Boolean,
        default: false,
    }
}, {versionKey: false, timestamps: true});

const addSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().min(7).max(12).required(),
    email: Joi.string().email().required(),
    favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

contactSchema.post('save', handleSaveErrors);

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    schemas,
};