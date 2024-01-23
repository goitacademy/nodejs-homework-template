import { logoutUser } from "../services/auth.helpers.js";

export async function logout(req, res, next) {
  try {
    const id = req.user.id;
    const user = await logoutUser(id);
    if (user.error) {
      res.status(401).json(user.error);
    }
    await user.clearToken();
    await user.save();
    return res.status(204).json("No Content");
  } catch (e) {
    return res.status(500).json(`An error occured: ${e.message}`);
  }
}
