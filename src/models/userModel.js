import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minLength: [6, 'Password should be at least 6 characters'],
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
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
  { timestamps: true, versionKey: false }
);

export const User = model('User', userSchema);
