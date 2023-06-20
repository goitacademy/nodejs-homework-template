const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
	},
	subscription: {
		type: String,
		enum: ["starter", "pro", "business"],
		default: "starter",
	},
	token: {
		type: String,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
