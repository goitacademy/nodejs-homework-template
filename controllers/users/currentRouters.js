import User from "../service/schemas/user.js";

async function currentUser(req, res, next) {
  const user = await User.findOne({ _id: req.user._id }).lean();
  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  if (user.token === null) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const resUser = {
    email: user.email,
    subscription: user.subscription,
  };

  return res.status(201).json(resUser);
}

export default currentUser;
