const { Schema, model } = require('mongoose');
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        // match: emailRegexp,
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
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
  },
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
});

const emailSchema = Joi.object({
    email: Joi.string().required(),
})

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
})

const schemas = {
    registerSchema,
    emailSchema,
    loginSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}