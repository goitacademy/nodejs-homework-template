const { Schema, model } = require("mongoose");
const { mongooseError } = require("../helpers");
const Joi = require("joi");

const regExpEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
const regExpPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
const validEnumValues = ["starter", "pro", "business"];
const userSchema = new Schema(
	{
		password: {
			type: String,
			match: regExpPassword,
			minlength: 8,
			required: [true, "Password is required"],
		},
		email: {
			type: String,
			match: regExpEmail,
			required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: validEnumValues,
			default: "starter",
		},
		token: {
			type: String,
			default: null,
		},
		avatarURL: {
			type: String,
			require: true,
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, "Verify token is required"],
		},
	},
	{ versionKey: false, timestamps: true },
);

const userCreateSchema = Joi.object({
	password: Joi.string().min(8).pattern(regExpPassword).required(),
	email: Joi.string().pattern(regExpEmail).required(),
	subscription: Joi.string(),
});

const userLoginSchema = Joi.object({
	password: Joi.string().min(8).pattern(regExpPassword).required(),
	email: Joi.string().pattern(regExpEmail).required(),
});
const userEmailSchema = Joi.object({
	email: Joi.string().pattern(regExpEmail).required(),
});

const updateSubscriptionSchema = Joi.object({
	subscription: Joi.string()
		.valid(...validEnumValues)
		.required(),
}).unknown(false);

const schemas = { userCreateSchema, userLoginSchema, updateSubscriptionSchema, userEmailSchema };

userSchema.post("save", mongooseError);

const User = model("user", userSchema);

module.exports = { User, schemas };
