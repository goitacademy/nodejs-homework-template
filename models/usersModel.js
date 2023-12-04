const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},
	subscription: {
		type: String,
		enum: ["starter", "premium", "vip"],
		default: "starter"
	},
	avatar: {
		type: String,
		default: null,
	},
	token: {
		type: String,
		default: null
	}
}, { versionKey: false, timestamps: true })

const userModel = mongoose.model("user", userSchema, 'users')

module.exports = userModel