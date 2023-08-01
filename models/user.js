const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema ({
  password: {
    type: String,
        required: [true, 'Set password for user'],
    minlength: 7
  },
  email: {
    type: String,
      required: [true, 'Email is required'],
    match: emailRegexp,
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String,
  avatarURL: String,
}, {versionKey: false})

userSchema.post('save', handleMongooseError)

const User = model('user', userSchema)

module.exports = User