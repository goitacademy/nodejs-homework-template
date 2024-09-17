const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema({
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
    // avatar: {
    //     type: String,
    //     required: true,
    // },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
});

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;