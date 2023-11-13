import User from "../../models/userModel.js";
export async function logoutExistingUser(req, res) {
  try {
    const user = await User.findById(req.userId);
    user.token = null;
    await user.save();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
