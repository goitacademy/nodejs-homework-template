const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
    {
        name: {
            type: String,
            minlength: 5,
            maxlength: 30,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
            minlength: 7,
            maxlength: 30,
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