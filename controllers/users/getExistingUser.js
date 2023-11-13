import User from "../../models/userModel.js";
export async function getExistingUser(req, res) {
  try {
    const user = await User.findById(req.userId);
    res
      .status(200)
      .json({ user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
