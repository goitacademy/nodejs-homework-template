const mongoose = require('mongoose')
const { Schema, model } = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Set password for user'],
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
        token: String
    }
)

userSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema)

module.exports = User