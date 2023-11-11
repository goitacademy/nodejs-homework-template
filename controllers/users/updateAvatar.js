import { User } from "../../service/schemas/User";
import { updateUser } from "../../models/users";
import { uploadMiddleware } from "../../app";
export const updateUser = async (req, res, next) => {
  const userId = res.locals.user._conditions._id;
  try {
    const result = await updateUser(userId, { avatarURL });
  } catch (error) {}
};
