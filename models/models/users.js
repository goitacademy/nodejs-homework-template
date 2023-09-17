const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    subscription: {
        type: String,
        enum: ['starter', 'pro', 'business'],
        default: 'starter',
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
        default: null,
    },
})

const User = mongoose.model('User', userSchema)
module.exports = User
