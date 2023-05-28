const { Schema, model } = require('mongoose');
const {hendleMongooseError} = require('../helpers')
const Joi = require('joi');


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

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})

const schemas = {
    addSchema,
    updateFavoriteSchema
}

contactSchema.post("save", hendleMongooseError)

const Contact = model("contact", contactSchema);

module.exports = {
    Contact, 
    schemas,
};