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
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json("Not found");
    }
    const fileName = req.file.originalname;
    const avatar = await Jimp.read(`${tempDir}/${fileName}`);
    avatar.resize(250, 250);
    const isUploaded = await avatar.write(`${avatarDir}/${user.id}${fileName}`);
    console.log(isUploaded);
    return res.status(200).json("Avatar uploaded.");
  } catch (e) {
    return res.status(500).json(e.message);
  }
}
