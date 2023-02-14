import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { isEmailValid } from 'helpers/validation';
import { ESubscription, UserType } from 'types/User.type';

const schema = new mongoose.Schema<UserType>({
  password: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    validate: [isEmailValid, 'Please fill a valid email address'],
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ESubscription,
    default: ESubscription.Starter,
  },
  token: String,
});

schema.pre('save', async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
  }
});

export const UserModel = mongoose.model('User', schema);
