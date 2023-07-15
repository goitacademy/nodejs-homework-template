const { Schema, model } = require('mongoose');

const schema = new Schema({
	password: {
		type: String,
		required: [true, 'Set password for user'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},
	subscription: {
		type: String,
		enum: ['starter', 'pro', 'business'],
		default: 'starter',
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	token: String,
});

const User = model('user', schema);
module.exports = User;
