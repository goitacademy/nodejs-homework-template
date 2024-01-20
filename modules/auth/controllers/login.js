import { loginUser } from "../services/auth.helpers.js";

export async function login(req, res, next) {
  try {
  } catch (e) {
    return res.status(500).json(`An error occured: ${e.message}`);
  }
}
