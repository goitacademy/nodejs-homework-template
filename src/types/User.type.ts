/* eslint-disable no-unused-vars */
export enum ESubscription {
  Starter = 'starter',
  Pro = 'pro',
  Business = 'business',
}

export type UserType = {
  password: string;
  email: string;
  subscription?: ESubscription;
  token?: string;
};
