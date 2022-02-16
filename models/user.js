const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			match: emailRegExp,
		},

		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: 6,
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
	},
	{ versionKey: false, timestampes: true }
);

const registerJoiScheme = Joi.object({
	email: Joi.string().pattern(emailRegExp).required(),
	password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

const schemas = {
	register: registerJoiScheme,
};

module.exports = {
	User,
	schemas,
};
