const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../helpers");
const Joi = require("joi");

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const userSchema = new Schema({

    password: {
        type: String,
        minlenght: 8,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        match: EMAIL_REGEXP, 
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
        avatarURL: {
        type: String,
        required:true,
        } 
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
	email: Joi.string().pattern(EMAIL_REGEXP).required(),
	password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
	email: Joi.string().pattern(EMAIL_REGEXP).required(),
	password: Joi.string().min(8).required(),
});

const updateUserSchema = Joi.object({
	subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
	registerSchema,
	loginSchema,
	updateUserSchema,
};

const User = model("user", userSchema);

module.exports = {
	User,
	schemas,
};