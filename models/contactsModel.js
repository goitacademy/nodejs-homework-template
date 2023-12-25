const { model, Schema, Types } = require('mongoose');
const { userRolesEnum } = require('../constants');

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
	role: {
		type: String,
		enum: Object.values(userRolesEnum),
		default: userRolesEnum.USER,
	},
	owner: {
		type: Types.ObjectId,
		ref: 'users',
		required: true,
	}
},
	{
		versionKey: false,
		timestamps: true,
	})

const contacts = model('contacts', contactsSchema);


module.exports = contacts;