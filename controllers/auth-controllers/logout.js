import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import User from "../../models/User.js";

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({});
};

export default ctrlWrapper(logout);
