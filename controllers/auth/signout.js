import { HTTP_STATUS } from "../../constants/http.js";
import { User } from "../../models/index.js";

export const signout = async ({ user }, res) => {
  const { _id: id } = user;
  await User.findByIdAndUpdate(id, { token: null });

  res.json({ message: "Successfully" });
};
