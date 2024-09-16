import { User } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const newUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.json({
    status: "success",
    code: 200,
    data: { email: newUser.email, subscription: newUser.subscription },
  });
};

export default updateSubscription;
