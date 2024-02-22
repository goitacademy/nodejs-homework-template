import { updateUser } from "../../service/index.js";

async function logOut(req, res, next) {
  try {
    const { id } = req.user;
    await updateUser(id, { token: null });
    return res.status(204).json({ message: "logged out" });
  } catch (e) {
    next(e);
  }
}

export { logOut };
