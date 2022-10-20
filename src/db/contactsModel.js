const { default: mongoose } = require("mongoose");
const mangoose = require("mongoose");

const contactsSchema = new mangoose.Schema({
    name: {
        type: String,
        required: [true, "Set name"],
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
});

const Contact = mongoose.model("contact", contactsSchema);

module.export = {
    Contact,
}