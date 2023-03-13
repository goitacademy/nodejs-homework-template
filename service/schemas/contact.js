const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
    {
        name: {
            type: String,
            minlength: 2,
            maxlength: 15,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            minlength: 8,
            maxlength: 30,
            required: [true, 'Email is required'],
        },
        phone: {
            type: String,
            minlength: 6,
            maxlength: 40,
            required: [true, 'Phone is required'],
        },
        favorite: {
            type: Boolean,
            default: false
        }
    },
    { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contact);

module.exports = Contact;