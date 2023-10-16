const { Schema, model} = require("mongoose");
const Joi = require("joi");

const emailRegexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const allowedSubscriptions = ["starter", "pro", "business"];

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
        minLength: 9,
      },
      email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: allowedSubscriptions,
        default: "starter"
      },
      token: String,
}, {versionKey: false, timestamps: true})

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(9).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(9).required(),
})

const subscriptionSchema = Joi.object({subscription: Joi.string().valid(...allowedSubscriptions)})

const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema
}

const User = model("user", userSchema);

module.exports ={
    User,
    schemas
}