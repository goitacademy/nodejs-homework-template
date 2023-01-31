const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const { handleSchemaValidationErrors } = require("../helpers");

const userSchema = Schema(
	{
		password: {
			type: String,
			minlength: 6,
			required: [true, "Set password for user"],
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

const schemas = {
	joiRegisterSchema,
	joiLoginSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
