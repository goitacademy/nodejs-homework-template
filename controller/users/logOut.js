import { User } from "../../service/schemas/User.js";
import { updateUser } from "../../models/users.js";
export const LogOut = async (req, res, next) => {
  const userId = res.locals.user._conditions._id;
  const user = await User.findById(userId);
  try {
    const result = await updateUser(userId, { token: null });
    return res.status(204);
  } catch (error) {
    next(error);
  }
};
