const { Schema, model } = require("mongoose");

const contacts = new Schema(
	{
		name: {
			type: String,
			minlength: 2,
			maxlength: 70,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
			minlength: 3,
			maxlength: 170,
			unqiue: true,
			lowercase: true,
			required: [true, "Set email for contact"],
		},
		phone: {
			type: String,
			minlength: 12,
			maxlength: 17,
			required: [true, "Set phone for contact"],
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

const Contacts = model("contacts", contacts);

module.exports = Contacts;
