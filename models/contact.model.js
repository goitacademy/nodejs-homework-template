const mongoose = require('mongoose')
const { schema } = mongoose

const contact = new schema({
	name: {
		type: String,
		required: [true, 'Set name for contact'],
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
	favorite: {
		type: Boolean,
		default: false,
	},
},
{ versionKey: false, timestamps: true }
)

const Contact = mongoose.model("contact", contact);

module.exports = Contact;