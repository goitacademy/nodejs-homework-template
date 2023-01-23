const { Schema, model } = require("mongoose");
const Joi = require("Joi");

const { handleMongooseError } = require("../helpers");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    email: {
        type: String,
        match: emailRegex,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlenght: 6,
        required: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },

    avatarURL: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
    },
    token: {
        type: String,
        default: null,
    },
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string(),
    token: Joi.string(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().required(),
    token: Joi.string(),
});
const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
})

const schemas = {
    registerSchema,
    loginSchema,
    emailSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}