import fs from "fs/promises";

import User from "../../models/user.js";
import { ctrlWrapper } from "../../decorator/index.js";

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Signout ssucess",
  });
};

export default ctrlWrapper(logout);
