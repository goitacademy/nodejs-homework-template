const mongoose = require('mongoose');
const { Schema, model} = mongoose;
const { Gender } = require('../../helpers/constants')
const bcrypt = require('bcryptjs');
const { valid } = require('joi');
const SALT_FACTOR = 6;


const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    default: 'Guest',
  },

  // gender: {
  //   type: String,
  //   enum: {
  //     values: [Gender.MALE, Gender.FEMALE, Gender.NONE],
  //     message: "it's not allowed"
  //   },
  //   default: 'Gender.NONE'
  // },

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
    enum: ["starter", "pro", "business"],
    default: "starter"
  },

  token: {
    type: String,
    default: null,
  },
},
  {
    versionKey: false,
    timestamps: true,
  })

  userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(SALT_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  }})

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User

