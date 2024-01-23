import jwt from "jsonwebtoken";
import { loginUser } from "../services/auth.helpers.js";

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await loginUser({ email, password });
    if (user.error) {
      return res.status(400).json(user.error);
    }
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    await user.setToken(token);
    await user.save();
    return res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (e) {
    return res.status(500).json(`An error occured: ${e.message}`);
  }
}
