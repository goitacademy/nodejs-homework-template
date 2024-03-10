// models/user/userModel.js
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
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: { 
    type: String,
    default: function() {
      return gravatar.url(this.email, { s: '200', r: 'pg', d: 'mm' });
    },
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    unique: true,
  },
},{ versionKey: false, timestamps: true });

const User = mongoose.model('User', userSchema);

export { User };
