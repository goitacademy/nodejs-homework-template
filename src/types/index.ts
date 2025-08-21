import type { ObjectId } from "mongoose";
import type { Document } from "mongoose";

export interface IUser {
  user: {
    email: string;
    subscription: string;
    password: string;
    verificationToken: string;
    verify: boolean;
    avatarURL: string;
    token: string;
    _id: ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
  };
}

export interface UserDocument extends Document {
  password: string;
  email: string;
  subscription: string;
  token: string;
  avatarURL: string;
  verify: boolean;
  verificationToken: string;
}
