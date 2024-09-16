import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import gravatar from 'gravatar';


dotenv.config();

const user = new Schema({
  password: {
    type: String,
    select: false,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  avatarURL: {
    type: String
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
});

user.methods.setPassword = async function (password) {
  this.password = await bcrypt.hash(password, +process.env.BCRYPT_SALT);
};

user.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

user.methods.setAvatarUrl = function (email) {
  this.avatarURL = gravatar.url(email, { protocol: 'http' });
};

const User = model('users', user);

export default User;
