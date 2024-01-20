import { signupUser } from "../services/auth.helpers.js";

export async function signup(req, res, next) {
  try {
    res.status(200).json("Test completed.");
  } catch (e) {
    return res.status(500).json(`An error occured: ${e.message}`);
  }
}
