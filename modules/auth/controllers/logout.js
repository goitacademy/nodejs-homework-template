import { logoutUser } from "../services/auth.helpers";

export async function logout(req, res, next) {
  try {
  } catch (e) {
    return res.status(500).json(`An error occured: ${e.message}`);
  }
}
