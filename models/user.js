import { Schema, model } from 'mongoose';
import { handleSaveError, handleUpdateValidate } from './hooks.js';
import emailRegexp from '../constants/user-constants.js';

// ##############################################

const userSchema = new Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set user password '],
    },
    avatarUrl: {
      type: String,
      // required: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: { type: String },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('findOneAndUpdate', handleUpdateValidate);

// Fired only if schema validation fails:
userSchema.post('save', handleSaveError);
userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export default User;
