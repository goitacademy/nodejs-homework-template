const { Schema, model } = require("mongoose");
const { customAlphabet } = require("nanoid");

const randomId = customAlphabet("1234567890", 4);
const handlerMogoosError = require("../helpers/handlerMogoosError");

const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ["starter", "pro", "business"];
const userSchema = new Schema(
    {
        name: {
            type: String,
            default: `user_${randomId()}`,
        },
        email: {
            type: String,
            require: true,
            match: emailRegexp,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            minlength: 7,
        },
        subscription: {
            type: String,
            enum: subscriptionList,
            default: "starter",
        },
        token: {
            type: String,
            default: null,
        },
        avatarURL: {
            type: String,
        },
        verificationToken: {
            type: String,
            required: [true, "Verify token is required"],
        },
        verify: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false }
);

userSchema.post("save", handlerMogoosError);

const User = model("user", userSchema);

const userRegisterSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(7).required(),
});

const userLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(7).required(),
});

const userSubscriptionShema = Joi.object({
    subscription: Joi.string()
        .valid(...subscriptionList)
        .required(),
});
const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
    userLoginSchema,
    userRegisterSchema,
    userSubscriptionShema,
    userEmailSchema,
};

module.exports = {
    User,
    schemas,
};
