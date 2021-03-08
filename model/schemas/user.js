const mongoose = require('mongoose')
const { Sex } = require('../helpers/constants')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 8
const { Schema, model } = mongoose
const userSchema = new Schema({
    name: {
        type: String,
        minLength: 2,
        default: "Guest"
    },
    sex: {
        type: String,
        enum: {
            values: [Sex.MALE, Sex.FEMALE, Sex.NONE],
            message: 'it`s not allowed'
        },
        default: Sex.NONE
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password required']
    },
    token: {
        type: String,
        default: "none"
    }
}, { versionKey: false, timestamps: true })
userSchema.path('email').validate(function (value) {
    const re = /\S+@\S+\.\S+/
    return re.test(String(value).toLowerCase())
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    this.password = await bcrypt.hash(this.password, salt, null)
    next()
})
userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
const User = model('user', userSchema)

module.exports = User