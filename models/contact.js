const { Schema, model } = require("mongoose");
const { hendleSaveError } = require("../middlewares");

const contactShema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });

contactShema.post("save", hendleSaveError);

const Contact = model("contact", contactShema);

module.exports = {
    Contact,
}