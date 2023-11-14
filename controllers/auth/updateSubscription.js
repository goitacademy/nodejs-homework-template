import { HTTP_STATUS } from "../../constants/http.js";
import { User } from "../../models/index.js";

export const updateSubscription = async ({ user, body }, res) => {
  const result = await User.findByIdAndUpdate(user._id, body, {
    new: true,
    select: "name email subscription",
  });

  res.json(result);
};
