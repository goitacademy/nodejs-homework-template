const {Schema, model} = require('mongoose')

const contactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    favorit: Boolean
})

const Contact = model("contact", contactSchema)

module.exports = Contact