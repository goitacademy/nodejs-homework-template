const mongoose = require('mongoose')
const {Schema, model, SchemaTypes} = mongoose
const {Subscription} = require('../../helper/constans') 
const bcrypt = require('bcryptjs')
 
const userSchema = new Schema ({
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
      enum: {
          values: [
              Subscription.STARTER, 
              Subscription.PRO, 
              Subscription.BUSINESS
            ]
    },
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
      },
  })

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

 /* userSchema.path('password').validate ((value) => {
const re = /[A-Z]\w+\[0-9]/
return re.test(String(value))
})*/

userSchema.path('email').validate ((value) => {
    const re = /\S+@\S+\.\S+/
    return re.test(String(value).toLowerCase())
    })

    userSchema.path('subscription').validate ((value) => {
    const re = /[A-Z]\w+/
    return re.test(String(value))
    })

const User = model('user', userSchema)

module.exports = User