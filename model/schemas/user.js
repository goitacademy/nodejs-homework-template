const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');


const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate(value) {
            // eslint-disable-next-line
            const re = new RegExp('^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,}$')
            return re.test(String(value))
        }
  },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate(value) {
            // eslint-disable-next-line
            const re = new RegExp('^[a-z0-9_-]+\.*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')
            return re.test(String(value).toLowerCase())
                }
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
    avatar: {
        type: String,
        default: function () {
            return gravatar.url(this.email, {s: '250'}, true)
        }
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verifyTokenEmail: {
        type: String,
        require: true,
        default: nanoid()
    }

  
}, { versionKey: false, timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(6)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})
userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compare(String(password), this.password)
 }

const User = model('user', userSchema)

module.exports = User



