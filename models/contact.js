const { Schema, model } = require("mongoose");
const { handleSaveError } = require("../middlewares");

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

contactShema.post("save", handleSaveError);

const Contact = model("contact", contactShema);

module.exports = {
    Contact,
}