const { Schema, model } = require("mongoose");
const { regexp, constants } = require("../../vars");
const { hash, compare } = require('bcrypt');
const crypto = require('crypto');

const userSchema = new Schema(
    {
        password: {
            type: String,
            match: regexp.pswd,
            required: [true, 'Password is required'],
            select: false,
        },
        email: {
            type: String,
            match: regexp.email,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: Object.values(constants.subscrUser),
            default: constants.subscrUser.STARTER,
        },
        token: {
            type: String,
            default: null,
        },
        avatarURL: String,
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
        }
    },
    {
        versionKey: false,
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew) {
        const emailHash = crypto.createHash('md5').update(this.email).digest('hex');
        this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=robohash&s=250`;
    }
    
    if (!this.isModified('password')) return next()
    const saltRounds = 10;
    this.password = await hash(this.password, saltRounds)
    next()
})

userSchema.methods.checkPswd = (candidate, pswdHash) => compare(candidate, pswdHash)

exports.User = model('user', userSchema)