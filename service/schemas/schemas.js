const mongoose = require("mongoose");
const handleMongooseError = require("../../helpers/handleMongooseError");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"]
    },
    phone: {
        type: String,
    },
    email: {
        type: String
    },
    favorite: {
        type: Boolean,
        default: false
    }
});

contactSchema.post("save", handleMongooseError);

const Contact = mongoose.model("contacts", contactSchema);

module.exports = Contact;
