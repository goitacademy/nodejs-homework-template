import { validateAddUser } from "../../validator.js";
import { findUserByEmail, createUser } from "../../service/index.js";

export async function signUp(req, res, next) {
  const { email, password } = req.body;
  const { error } = validateAddUser(req.body);
  const user = await findUserByEmail({ email });
  if (error) {
    console.log(error);
    return res.json({ status: 400, msg: "Missing fields" });
  }
  if (user) {
    return res.json({ status: 409, msg: "Email in use" });
  }

  try {
    const newUser = await createUser({ email, password });
    return res.status(201).json({
      status: "created",
      code: 201,
      user: { email: newUser.email, subscription: "starter" },
    });
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
