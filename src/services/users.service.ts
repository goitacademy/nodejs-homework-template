import jwt from 'jsonwebtoken';
import { UnAuthorizedError } from 'helpers/errors';
import { UserModel } from 'models/user.schema';
import { ESubscription, UserType } from 'types/User.type';

export const getUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email }).select({ __v: 0 });

  return user;
};

export const getUserByVerificationToken = async (verificationToken: string) => {
  const user = await UserModel.findOne({ verificationToken }).select({ __v: 0 });

  return user;
};

export const getUserById = async (id: string): Promise<UserType | null> => {
  const user = await UserModel.findById(id).select({ email: 1, subscription: 1, token: 1 });

  return user;
};

export const registerService = async (candidate: UserType) => {
  const user = new UserModel(candidate);
  await user.save();

  const { email, subscription, avatarURL } = user;

  return { email, subscription, avatarURL };
};

export const loginService = async (candidate: UserType) => {
  const user = await getUserByEmail(candidate.email);

  if (!user || !(await user.validPassword(candidate.password))) {
    throw new UnAuthorizedError('Email or password is wrong');
  }

  const { email, subscription, avatarURL, _id } = user;
  const payload = {
    _id,
    email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
  await user.updateOne({ token });

  return { token, user: { email, subscription, avatarURL } };
};

export const logoutService = async (id: string) => {
  await UserModel.findByIdAndUpdate(id, { token: null });
};

export const updateSubscriptionService = async (userId: string, subscription: ESubscription) => {
  const user = await UserModel.findByIdAndUpdate(userId, { subscription }, { new: true }).select({
    email: 1,
    subscription: 1,
    avatarURL: 1,
    _id: 0,
  });

  return user;
};

export const updateAvatarService = async (userId: string, avatarURL: string) => {
  const user = await UserModel.findByIdAndUpdate(userId, { avatarURL }, { new: true }).select({
    email: 1,
    subscription: 1,
    avatarURL: 1,
    _id: 0,
  });

  return user;
};
