const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleSchemaValidationErrors } = require('../models/helpers/index');

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
        unique: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        pattern: [
      /\(?([0-9]{3})\) \/?([0-9]{3})-?([0-9]{4})/,
      "For example (000) 000-0000"],
        unique: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleSchemaValidationErrors);

const addContactSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().pattern(/\(?([0-9]{3})\) \/?([0-9]{3})-?([0-9]{4})/,
      "For example (000) 000-0000").required(),
    favorite: Joi.bool(),
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
})

const schemas = {
    addContactSchema,
    updateFavoriteSchema
}
    
const Contact = model('contact', contactSchema);


module.exports = {
    Contact,
    schemas,
};