import { User } from "../../service/schemas/User.js";

export const currentUser = async (req, res, next) => {
  const userId = res.locals.user._conditions._id;
  
  const user = await User.findById(userId, {
    email: 1,
    subscription: 1,
    _id: 0,
  });

  return res.status(200).json({ user });
};
