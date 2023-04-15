const {schema, model, Schema} = require('mongoose');

const  contactSchema  = new Schema({
    name: String,
    email: String,
    phone: String,
    favorite: Boolean,
})

const Contact = model("contact", contactSchema);

module.exports = Contact;