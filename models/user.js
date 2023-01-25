const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt")

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 8,
        },
    email: {
        type: String,
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
    }
}, { versionKey: false, timestamps: true })

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

const joiRegistrationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    subscription: Joi.string().required()
})

const joiLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    subscription: Joi.string().required()
})

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = {
    User,
    joiRegistrationSchema,
    joiLoginSchema,
    joiSubscriptionSchema
}