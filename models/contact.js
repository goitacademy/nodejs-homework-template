const { Schema, model } = require('mongoose');
const handleSchemeValidationError = require('./handleSchemeValidationError');

const contactScheme = new Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
	},
	phone: {
		type: String,
		match: /^\(\d{3}\)\s?\d{3}-\d{4}$/,
		required: [true, "Phone number is required"],
		unique: true,
	},
	favorite: {
		type: Boolean,
		default: false,
	},
}, { versionKey: false, timestamps: true });

contactScheme.post("save", handleSchemeValidationError);

const Contact = model('contact', contactScheme);

module.exports = {
	Contact,
};