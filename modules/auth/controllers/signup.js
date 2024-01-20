import { signupUser } from "../services/auth.helpers.js";
import { userValidation } from "../services/auth.validation.js";

export async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    const val = userValidation.validate({ email, password });
    if (val.error) {
      return res.status(400).json(val.error);
    }
    const data = await signupUser({ email, phone });
    console.log(data);
    return res.status(200).json("Test completed.");
  } catch (e) {
    return res.status(500).json(`An error occured: ${e.message}`);
  }
}
