/* eslint-disable no-unused-vars */
export enum ESubscription {
  Starter = 'starter',
  Pro = 'pro',
  Business = 'business',
}

export type UserType = {
  _id?: string;
  password: string;
  email: string;
  avatarURL?: String;
  subscription?: ESubscription;
  token?: string;
  verify?: boolean;
  verificationToken?: string;
};
