import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import User from "../../models/User.js";

const updateUser = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const updateUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.json({
    user: { email: updateUser.email, subscription: updateUser.subscription },
  });
};

export default ctrlWrapper(updateUser);
