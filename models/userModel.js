import mongoose from 'mongoose';

import gravatar from 'gravatar';

const { Schema } = mongoose;

const userSchema = new Schema({
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
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
});

userSchema.pre('save', function (next) {
  if (!this.avatarURL) {
    this.avatarURL = gravatar.url(this.email, { s: '250', d: 'retro' }, true);
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
