const { Schema, model } = require('mongoose');

const schema = new Schema({
	password: {
		type: String,
		minLength: [6, 'Password should be at least 6 characters long'],

		required: [true, 'Set password for user'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'User email is not valid'],
		unique: true,
	},
	subscription: {
		type: String,
		enum: ['starter', 'pro', 'business'],
		default: 'starter',
	},

	token: String,
});

const User = model('user', schema);
module.exports = User;
