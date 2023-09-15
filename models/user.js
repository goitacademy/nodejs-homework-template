const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');
const { regexpList } = require('../variables');

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: [6, 'Password min length 6 characters'],
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: [regexpList.email, 'Email must be valid'],
      required: [true, 'Email is required'],
      unique: [true, 'Email in use'],
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
  },
  { versionKey: false }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
