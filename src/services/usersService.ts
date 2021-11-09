import { User } from "../model";
import { IUser } from "../helpers";

const signupUser = async (user: IUser) => {
  const newUser = await new User(user);

  await newUser.save();

  return newUser;
};

export { signupUser };
