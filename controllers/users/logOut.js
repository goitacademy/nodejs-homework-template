import { User } from "../../service/schemas/users.js";

async function logOut(req, res, next) {
  try {
    const { id } = req.user;
    await User.findByIdAndUpdate({ _id: id }, { token: null }, { new: true });
    return res.json({ status: 204, msg: "Logged Out" });
  } catch (e) {
    next(e);
  }
}

export { logOut };
