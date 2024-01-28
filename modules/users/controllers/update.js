import { User } from "../schemas/user.schema.js";

export async function updateUser(req, res) {
  try {
    const subscriptions = ["starter", "pro", "buisness"];
    const { subscription } = req.body;
    if (!subscriptions.includes(subscription)) {
      return res.status(400).json("Invalid subscription");
    }
    const id = req.user.id;
    const user = await User.findByIdAndUpdate(id, {
      subscription: subscription,
    });
    if (!user) {
      return res.status(404).json("Not found");
    }
    return res.status(200).json("User updated.");
  } catch (e) {
    return res.status(500).json(e.message);
  }
}

export async function updateAvatar(req, res) {
  try {
    return res.status(200).json("Avatar uploaded.");
  } catch (e) {
    return res.status(500).json(e.message);
  }
}
