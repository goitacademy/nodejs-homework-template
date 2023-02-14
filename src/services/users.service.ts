import { UserModel } from 'models/user.schema';
import { UserType } from 'types/User.type';

export const getUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });

  return user;
};

export const registerService = async (candidate: UserType) => {
  const user = new UserModel(candidate);
  await user.save();

  const { email, subscription } = user;

  return { email, subscription };
};
