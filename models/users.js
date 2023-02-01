const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const { handleSchemaValidationErrors } = require("../helpers");

const userSchema = Schema(
	{
		password: {
			type: String,
			minLength: 6,
			maxLength: 30,
			required: [true, "Set password for user"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			trim: true,
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
	{ versionKey: false, timestamps: true }
);

const joiRegisterSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string().email().required(),
	subscription: Joi.string().valid("starter", "pro", "business"),
	token: Joi.string(),
});

const joiLoginSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string().email().required(),
});

const joiUpdateSubscription = Joi.object({
	subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
	joiRegisterSchema,
	joiLoginSchema,
	joiUpdateSubscription,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
