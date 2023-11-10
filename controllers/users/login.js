import { User } from "../../service/schemas/User.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { updateUser } from "../../models/users.js";
const secret = process.env.SECRET;
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select(`+password`);
  console.log(secret);
  if (!user || !user.validPassword(password)) {
    return res.status(400).json({ message: "incorect email or password" });
  }

  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  const result = await updateUser(user.id, { token });
  return res.status(200).json({ token, user });
};
