import { updateUser } from "../../service/index.js";

async function logOut(req, res, next) {
  if (res.user.length === 0) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const id = res.user[0]._id;

  await updateUser(id, { token: null });

  return res.status(204).json({ message: "logged out" });
}

export { logOut };
