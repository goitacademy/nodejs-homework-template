const { Schema, model } = require("mongoose");
const contactMiddlewares = require("../middlewares/index");



const contactScheme = new Schema({
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
});


contactScheme.post("save", contactMiddlewares.mongooseError);


const Contact = model("contact", contactScheme);


module.exports = Contact;
