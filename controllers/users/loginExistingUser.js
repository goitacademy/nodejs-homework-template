import User from "../../models/userModel.js";
import jwt from "jsonwebtoken";
export async function loginExistingUser(req, res) {
  try {
    const token = jwt.sign({ id: User._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    User.token = token;
    await User.save();

    res.status(200).json({
      token,
      user: { email: User.email, subscription: User.subscription },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
