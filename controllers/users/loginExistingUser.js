import User from "../../models/userModel.js";
import jwt from "jsonwebtoken";

export async function loginExistingUser(req, res) {
  try {
    // Tutaj powinno być pobranie użytkownika z bazy danych na podstawie emaila
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ id: user._id }, "my-secret-key", {
      expiresIn: "1h",
    });

    // Aktualizacja pola token w bazie danych
    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
