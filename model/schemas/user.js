const mongoose = require('mongoose')
const { Schema, model } = mongoose
const gravatar = require('gravatar')
 const { subscription } = require('../../helpers/constants')
const bcrypt = require('bcryptjs')
const SALT_FACTOR = 6

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
      validate(value) {
          const re = /\S+@\S+\.\S+/
          return re.test(String(value).toLowerCase())
    }
  },
  subscription: {
    type: String,
    enum: [subscription.STARTER, subscription.PRO, subscription.BUSINESS],
    default: subscription.STARTER,
  },
 
  name: {
    type: String,
    minlength: 2,
    default: 'Guest'
  },
  token: {
      type: String,
      default: null,
  },
  avatar: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250' }, true)
    }
  }
  // idCloudAvatar: {
  //   type: String,
  //   default: null,
  // }
},
{
  timestamps: true,
},
)

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSaltSync(SALT_FACTOR)
      this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userSchema.methods.validPassword = async function  (password) {
    return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User