const { Schema, model } = require("mongoose");
const usersSchemas = require("../schemas/usersSchemas");

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
			default: null,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
		avatarURL: {
			type: String,
		},
	},
	{ versionKey: false, timestamps: true }
);

const schemas = {
	register: usersSchemas.registerSchema,
	login: usersSchemas.loginSchema,
};

const User = model("user", userSchema);

module.exports = {
	User,
	schemas,
};
