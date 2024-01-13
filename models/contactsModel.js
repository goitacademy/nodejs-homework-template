const { model, Schema } = require('mongoose');

const contactsSchema = new Schema({
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
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	}
},
	{
		versionKey: false,
		timestamps: true,
	})

const contacts = model('contacts', contactsSchema);


module.exports = contacts;