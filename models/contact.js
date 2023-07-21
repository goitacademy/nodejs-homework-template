const { Schema, model } = require("mongoose");

const contactsSchema = new Schema({
	name: String,
	phone: String,
	email: String,
	favorite: Boolean,
})

const Contact = model("contact", contactsSchema);

module.exports = Contact;