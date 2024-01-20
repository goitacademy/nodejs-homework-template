import { currentUser } from "../services/auth.helpers";

export async function current(req, res, next) {
  try {
  } catch (e) {
    return res.status(500).json(`An error occured: ${e.message}`);
  }
}
