const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'This fill is required, please fill it'],
            unique: false,
        },
        email: {
            type: String,
            required: [true, 'This fill is required, please fill it'],
            unique: true,
        },
        phone: {
            type: String,
            required: [true, 'This fill is required, please fill it'],
            unique: true,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    },
    {
        versionKey: false,
        timestamps: true,
    },
)

const Contact = model('contact', contactSchema)

module.exports = Contact