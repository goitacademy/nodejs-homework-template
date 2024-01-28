import Jimp from "jimp";
import { User } from "../schemas/user.schema.js";
import { tmpDir, avatarDir } from "../middlewares/avatar.js";

export async function updateUser(req, res) {
  try {
    const subscriptions = ["starter", "pro", "buisness"];
    const { subscription } = req.body;
    if (!subscriptions.includes(subscription)) {
      return res.status(400).json("Invalid subscription");
    }
    const id = req.user[0].id;
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

export async function updateAvatar(req, res, next) {
  try {
    const user = await User.findById(req.user[0].id);
    if (!user) {
      return res.status(404).json("Not found");
    }
    const fileName = req.file.originalname;
    const avatar = await Jimp.read(`tmp/${fileName}`);
    avatar.cover(250, 250);
    await avatar.writeAsync(`public/avatars/${user.id}${fileName}`);
    user.avatarURL = `http://localhost:3000/avatars/${user.id}${fileName}`;
    user.save();
    return res.status(200).json({
      avatarUrl: `http://localhost:3000/avatars/${user.id}${fileName}`,
    });
  } catch (e) {
    return res.status(500).json(e.message);
  }
}
