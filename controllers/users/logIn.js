import jwt from "jsonwebtoken";
import { validateAddUser } from "../../validator.js";
import { findUserByEmail, updateUser } from "../../service/index.js";

export async function logIn(req, res, next) {
  const { email, password } = req.body;
  const { error } = validateAddUser(req.body);

  if (error) {
    return res.json({ status: 400, msg: "Missing fields" });
  }

  const user = await findUserByEmail(email);

  if (!user) {
    return res.json({ status: 401, msg: "Email or password is wrong" });
  }

  try {
    const id = user._id;
    const checkPassword = await user.validPassword(password);

    if (checkPassword) {
      const payload = {
        id,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });

      await updateUser(id, token);

      return res.status(200).json({
        token: token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } else {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
