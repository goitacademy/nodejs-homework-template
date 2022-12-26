const { Schema, model } = require("mongoose");
const Joi = require('joi');

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, "Set email for contact"],
    },
    phone: {
        type: String,
        required: [true, "Set phone for contact"],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });

const joiSchema = Joi.object({
     name: Joi.required(),
    email: Joi.required(),
    phone: Joi.required(),
    favorite: Joi.bool,
})

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    joiSchema,
}