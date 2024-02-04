import User from "../service/schemas/user.js";

async function logoutUser(req, res, next) {
  const user = await User.findOne({ _id: req.user._id }).lean();

  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  if (user.token === null) {
    return res.status(401).json({ message: "Not authorized" });
  }
  await User.findOneAndUpdate(
    {
      _id: user._id,
    },
    {
      $set: {
        token: null,
      },
    },
    {
      upsert: false,
    }
  );

  return res.status(204).json({ message: "Success" });
}

export default logoutUser;
