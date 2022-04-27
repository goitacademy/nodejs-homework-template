const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: '',
    },
    avatarURL: {
        type: String
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    }
}, { versionKey: false, timestamps: true });

const registerJoiSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
})
const verifyEmailschema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required()
})

const User = model("user", userSchema);

const schemas = {
    register: registerJoiSchema,
    verify: verifyEmailschema
};

module.exports = {
    User,
    schemas
}