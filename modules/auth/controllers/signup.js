import { signupUser } from "../services/auth.helpers.js";

export async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    const data = await signupUser({ email, password });
    if (data.error) {
      res.status(409).json(data.error);
    }
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json(`An error occured: ${e.message}`);
  }
}
