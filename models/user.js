const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
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
    },
    avatarURL: {
        type: String, 
        required: true
    }
}, { versionKey: false, timestamps: true });

userSchema.methods.setPassword = function(password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

const userRegisterJoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    subscription: Joi.string().valid("starter", "pro", "business")
});

const userLoginJoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
});

const userSubscriptionJoiSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business")
});

const User = model("user", userSchema);

module.exports = {
    User,
    userRegisterJoiSchema,
    userLoginJoiSchema,
    userSubscriptionJoiSchema
}
