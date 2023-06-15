const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
			maxlength: [30, "Cannot enter longer name than 30 characters"],
		},
		email: {
			type: String,
			unique: true,
		},
		phone: {
			type: String,
			unique: true,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ collection: "contacts" }
);

const Contact = mongoose.model("contacts", contactSchema);

module.exports = Contact;
