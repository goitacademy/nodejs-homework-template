import User from "#models/userModel.js";
import bcrypt from "bcrypt";
import { loginSchema } from "#validators/loginSchema.js";

export async function loginUser(req, res) {
  const { email, password } = req.body;
  // Walidacja danych wejściowych
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
