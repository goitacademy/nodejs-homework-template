const mongoose = require('mongoose');
const { Schema, model } = mongoose;
// const { subscribe } = require('../../helper/constants')
const bcrypt = require ('bcryptjs')


const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        alidate(value) {
            // eslint-disable-next-line
            const re = new RegExp('^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$')
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
        // enum: {
        //     values: [subscribe.STARTER, subscribe.PRO, subscribe.BUSINESS ]
        // },
        //  default: "starter"
    },
    token: {
        type: String,
        default: null,
      },
  
}, { versionKey: false, timestamps: true });

const User = model('user', userSchema)

module.exports = User

// contactSchema.path('name').validate(function (value) {
//     const re = /[A-Z]\w+/
//     return re.test(String(value))
// })

userSchema.pre('save' , async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(6)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})
userSchema.methods.validpassword = async function (password) {
     return await bcrypt.compare(password, this.password)
 }

// contactSchema.path('phone').validate(function (value) {
//     // eslint-disable-next-line
//     const re = new RegExp('^[(][0-9]{3}[)] [0-9]{3}[-][0-9]{4}$')
//     return re.test(String(value))
// })




