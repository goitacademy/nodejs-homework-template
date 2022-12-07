const { Schema, model } = require("mongoose");
const Joi = require('joi');

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
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

}, { versionKey: false, timeStamps: true });

const joiSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(7).required(),
    });

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    joiSchema
}