import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { isEmailValid } from 'helpers/validation';
import { ESubscription, UserType } from 'types/User.type';

type UserMethodsType = {
  validPassword: (password: string) => Promise<boolean>;
};
type UserModelType = Model<UserType, {}, UserMethodsType>;

const schema = new Schema<UserType, UserModelType, UserMethodsType>(
  {
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
    avatarURL: String,
    subscription: {
      type: String,
      enum: ESubscription,
      default: ESubscription.Starter,
    },
    token: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { timestamps: true }
);

schema.pre('save', async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
  }
});

schema.methods.validPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model<UserType, UserModelType>('User', schema);
