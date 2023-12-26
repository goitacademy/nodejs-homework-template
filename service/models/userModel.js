const { Schema, model } = require("mongoose");
const { regexp, constants } = require("../../vars");
const {hash, compare} = require('bcrypt');

const userSchema = new Schema({
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
        enum: Object.values(constants.descrUser),
        default: constants.descrUser.STARTER,
    },
    token: {
        type: String,
        default: null,
    },
}, {
    versionKey: false,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const saltRounds = 10;
    this.password = await hash(this.password, saltRounds)
    next()
})

userSchema.methods.checkPswd = (candidate, pswdHash) => compare(candidate, pswdHash)

exports.User = model('user', userSchema)