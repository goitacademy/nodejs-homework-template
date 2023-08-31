const { Schema, model } = require("mongoose");
const { handleMangooseError } = require("../helpers");
const Joi = require("joi");

const emailPattern =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, "Set password for user"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			match: emailPattern,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: String,
		avatarURL: String,
	},
	{ versionKey: false, timestamps: true }
);

userSchema.post("save", handleMangooseError);

const registerLoginSchema = Joi.object({
	email: Joi.string().pattern(emailPattern).required(),
	password: Joi.string().min(6).required(),
	subscription: Joi.string(),
});

const updateSubscriptionSchema = Joi.object({
	subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const User = model("user", userSchema);

module.exports = { User, registerLoginSchema, updateSubscriptionSchema };
