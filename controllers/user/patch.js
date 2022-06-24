import createError from "http-errors";
import models from "../../models/index.js";
// import mongoose from "mongoose";

const { userModel } = models;
const { User } = userModel;

const { BadRequest } = createError;

export const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const { email } = req.user;

  const subs = ["starter", "pro", "business"];
  if (!subs.includes(subscription)) {
    throw new BadRequest(
      `Type of subscription ${subscription} not allowed. Choose "starter", "pro" or "business"`
    );
  }
  await User.findByIdAndUpdate(_id, { subscription }, { new: true });
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Subscription updated",
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};
