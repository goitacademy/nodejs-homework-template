const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    year: Number,
})

const Contact = model("contact", contactSchema)

module.exports = Contact;