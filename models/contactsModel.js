const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Set name for your contact']
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	phone: {
		type: String,
		required: true,
		unique: true
	},
	favorite: {
		type: Boolean,
		default: false,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: 'user',
	}
}, { versionKey: false, timestamps: true })

const contactModel = mongoose.model("contact", contactSchema, "contacts")

module.exports = contactModel