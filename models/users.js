const mongoose = require("mongoose");

const schema = mongoose.Schema({
	password: {
		type: String,
		required: [true, 'Password is required'],
		minLength: [6, "password should be at least 6 characters long"],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},
	subscription: {
		type: String,
		enum: ["starter", "pro", "business"],
		default: "starter"
	},
	avatarURL: {
		type: String,
	},
	token: {
		type: String,
		default: null,
	},
	owner: {
		type: mongoose.ObjectId,
		ref: 'user',
	}
},
	{
		timestamps: true,
		versionKey: false,
	}
);

const User = mongoose.model("user", schema);

module.exports = {
	User,
};