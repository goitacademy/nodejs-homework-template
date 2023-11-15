import User from "#models/userModel.js";
import { registerExistingUserSchema } from "#validators/registerExistingUserSchema.js";

export async function registerExistingUser(req, res) {
  const { email, password } = req.body;

  const { error } = registerExistingUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already in use" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
