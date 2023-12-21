const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleSaveErrors = require("../helpers/handleSaveErrors");
const emailRegexp = require("./emailRegexp");

const typeSubscription = ["starter", "pro", "business"];

const userSchema = new Schema({
    pasword: {
        type: String,
        minlength: 6,
        required: [true, "Set password for user"],
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, "Email is required"],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: null,
    },
    token: {
        type: String,
        default: null,
    },
},
    { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription: Joi.string(),
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...typeSubscription).required(),
});

const User = model("user", userSchema);

const schema = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
};

model.exports = { schema, User };