const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const subscriptionList = ['starter', 'pro', 'business'];

const userSchema = Schema({
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Set password for user'],
    },
    subscription: {
        type: String,
        enum: subscriptionList,
        default: "starter"
    },
    token: {
        type: String,
        default: "",
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
}, { versionKey: false, timestamps: true });

userSchema.post('save', handleMongooseError)

const User = model('user', userSchema);

module.exports = {User, subscriptionList};