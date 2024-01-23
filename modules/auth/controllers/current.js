import { currentUser } from "../services/auth.helpers.js";

export async function current(req, res, next) {
  try {
    const id = req.user.id;
    const user = await currentUser(id);
    if (user.error) {
      return res.status(401).json(user.error);
    }
    return res.status(200).json({ ...user });
  } catch (e) {
    return res.status(500).json(`An error occured: ${e.message}`);
  }
}
