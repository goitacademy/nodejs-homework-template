import { UserModel } from "../../schemas/user.js";
const logout = async (req, res) => {
  const { _id } = req.user;
  await UserModel.findByIdAndUpdate(_id, { token: "" });
  res.json({ message: "Logout success" });
};
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";

const ctrlLogout = ctrlWrapper(logout);
export default ctrlLogout;
