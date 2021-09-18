const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { v4 } = require("uuid");
const gravatar = require('gravatar')

const emailRegexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = Schema(
    {
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: emailRegexp,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter",
        },
        token: {
            type: String,
            default: null,
        },

        avatarURL: {
            type: String,
            default: function () {
                return gravatar.url(this.email, { s: "250" }, true);
                // gravatar.url('taras__1@gmail.com', { s: '250' }, true)
            },
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    console.log(
        " as hashPassword - userSchema.methods.setPassword",
        userSchema.methods.setPassword
    );
};

userSchema.methods.comparePassword = function (password) {
    console.log(
        " as result - userSchema.methods.comparePassword",
        userSchema.methods.comparePassword
    );
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.createVerifyToken = function () {
    this.verifyToken = v4();
    console.log(
        "userSchema.methods.createVerifyToken",
        userSchema.methods.createVerifyToken
    );
};

const joiSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

module.exports = { User, joiSchema };
