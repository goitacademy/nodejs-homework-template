import models from "../../models/index.js";

const { userModel } = models;
const { User } = userModel;

export const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};
