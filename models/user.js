const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const regexp = { email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ };

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
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: String,
	},
	{ versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
	email: Joi.string()
		.pattern(regexp.email)
		.required()
		.messages({ "any.required": "missing required email field" }),
	password: Joi.string()
		.min(6)
		.required()
		.messages({ "any.required": "missing required password field" }),
});

const loginSchema = Joi.object({
	email: Joi.string()
		.pattern(regexp.email)
		.required()
		.messages({ "any.required": "missing required email field" }),
	password: Joi.string()
		.min(6)
		.required()
		.messages({ "any.required": "missing required password field" }),
});

const schemas = {
	registerSchema,
	loginSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
