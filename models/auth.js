const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

const userSchema = new Schema(
	{
		password: {
			type: String,
			minlength: 6,
			required: [true, "Set password for user"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			match: emailRegexp,
			unique: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			minlength: 6,
			default: "starter",
		},
		token: String,
		default: "",
	},
	{ versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerschema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min().required(),
});

const loginschema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

const User = model("auth", userSchema);

const schemas = { registerschema, loginschema };

module.exports = { User, schemas };
