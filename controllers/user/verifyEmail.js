import models from "../../models/index.js";
import createError from "http-errors";

const { userModel } = models;
const { User } = userModel;
const { NotFound } = createError;

export const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw NotFound("User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    status: "success",
    code: 200,
    message: "Verication successful",
  });
};
