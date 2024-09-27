const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactsSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
			maxlength: [30, "Cannot enter longer name than 30 characters"],
		},
		email: {
			type: String,
			unique: true,
			required: [true, "Please add email"],
		},
		phone: {
			type: String,
			unique: true,
			required: [true, "Please add phone number"],
		},
		favorite: {
			type: Boolean,
			default: false,
			required: [true, "Please set favorite category"],
		},
	},
	{ collection: "contacts" }
);

const Contact = mongoose.model("Contacts", contactsSchema);

module.exports = Contact;
