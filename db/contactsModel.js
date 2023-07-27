const {Schema, SchemaTypes, model} = require("mongoose");

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
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
    }, owner: {
        type: SchemaTypes.ObjectId,
        ref:'user',
    }
});

const Contacts = model("contact", contactSchema);
module.exports = {
    Contacts
};