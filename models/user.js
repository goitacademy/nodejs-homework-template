const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
const { REGEXP } = require("../constants");

const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, "Set password for user"],
		},
		email: {
			type: String,
			minlength: 4,
			maxlength: 255,
			match: REGEXP.email,
			unique: true,
			required: [true, "Email is required"],
		},
		subscription: {
			type: String,
			enum: subscriptionList,
			default: "starter",
		},
		token: {
			type: String,
			default: "",
		},
		avatarURL: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true, versionKey: false }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const authSchema = Joi.object({
	email: Joi.string().min(4).max(255).pattern(REGEXP.email).required(),
	password: Joi.string().min(8).max(255).required(),
});

const updateSubscriptionSchema = Joi.object({
	subscription: Joi.string()
		.valid(...subscriptionList)
		.required(),
});

const schemas = {
	registerSchema: authSchema,
	loginSchema: authSchema,
	updateSubscriptionSchema,
};

module.exports = {
	User,
	schemas,
};