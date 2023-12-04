const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Set name for your contact']
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	favorite: {
		type: Boolean,
		default: false,
	},
	ownerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	}
}, { versionKey: false, timestamps: true })

const contactModel = mongoose.model("contact", contactSchema, "contacts")

module.exports = contactModel