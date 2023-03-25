import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../../schemas/user.js";
import { HttpError } from "../../helpers/HttpError.js";
const { SECRET_KEY } = process.env;
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new HttpError(400, `${email} and password are required`);
  }
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new HttpError(401, `No user found with email: ${email}`);
  }
  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    throw new HttpError(401, "Invalid password");
  }
  const token = jwt.sing({ userId: user._id }, SECRET_KEY, {
    expiresIn: "23h",
  });
  await UserModel.findByIdAndUpdate(user._id, { token });
  res.json({ token });
};

const ctrlLogin = ctrlWrapper(login);
export default ctrlLogin;
