import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // hash password
import gravatar from 'gravatar'; // making avatar
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
    avatarURL: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

// mongoose middleware --> before save
userSchema.pre('save', async function () {
  //if User doesn't exist -->
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10); // hash password
  }

  if (this.isNew && !this.avatarURL) {
    this.avatarURL = gravatar.url(this.email, { s: '250', r: 'x', d: 'retro' }); // make default avatar
  }
});

export const User = model('User', userSchema);
