const { Schema, model } = require('mongoose');

const handleMongooseError = require('../middlewares/handleMongooseError');

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: [8, 'Minimum length 8 characters'],
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
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = { User };
