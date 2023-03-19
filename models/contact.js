const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
    {
        name: {
            type: String,
            minlength: 5,
            maxlength: 30,
            required: [true, 'Name is required'],
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        phone: {
            type: String,
            minlength: 7,
            maxlength: 30,
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
    { versionKey: false, timestamps: false },
);

const Contact = mongoose.model("contact", contact);

module.exports = Contact;