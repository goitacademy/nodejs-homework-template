const { Schema, model } = require('mongoose');
const handleMongooseError = require('../utils/handleMongooseError');

const userMongooseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: '',
    },
  },

  { versionKey: false, timestamps: true }
);
userMongooseSchema.post('save', handleMongooseError);
const User = model('user', userMongooseSchema);

module.exports = {
  User,
};
