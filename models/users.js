const {Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const Joi = require("joi");


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
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',

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

}, {versionKey: false, timestamps: true});

const joiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required()

});

const verifyEmailSchema = Joi.object({
    email: Joi.string().required()
})

userSchema.methods.comparePassword = function (password){
    return bcrypt.compareSync(password, this.password);
}

const User = model("user", userSchema);

module.exports ={
    User,
    joiSchema,
    verifyEmailSchema
}