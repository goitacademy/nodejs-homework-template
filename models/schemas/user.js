const { Schema } = require('mongoose')
const bcrypt = require('bcryptjs')

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
        enum: ['starter', 'pro', 'business'],
        default: 'starter'
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        default: null,
    },
    idCloudAvatar: {
        type: String,
        default: null
    }
})

userSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.validpassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = userSchema
