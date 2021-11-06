const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Set email for contact'],
            unique: true,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false, timestamps: true }
)
const Contact = model('contact', contactSchema)

module.exports = Contact