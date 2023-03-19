const {Schema , model} = require('mongoose')
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSignUpSchema = new Schema( {
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
    avatarUrl: {
        type: String,
        required: true
    }
}, {versionKey: false,timestamps:true});

userSignUpSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSignUpSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const joiSignUpSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),
    password: Joi.string().min(3).max(15).required(),
    subscription: Joi.string().default('starter').valid('starter', 'pro', 'business'),
    token: Joi.string().default(null)
});

const joiSignInSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),
    password: Joi.string().min(3).max(15).required(),
});

const joiPatchUserSchema = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business')
})

const User = model('users', userSignUpSchema)

module.exports = {User, joiSignUpSchema, joiSignInSchema, joiPatchUserSchema}