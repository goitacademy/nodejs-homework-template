const mongoose = require("mongoose");
const ErrorHandle = require('../middlewares/ErrorHandle')
const userScema = mongoose.Schema(
    {
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
    { timestamps: true }
);
userScema.post("save", ErrorHandle);
const Contacts = mongoose.model('Contacts', userScema)

module.exports = Contacts;