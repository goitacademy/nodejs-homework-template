import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = "example.token.1234";

  res.json({ token });
};

export default ctrlWrapper(signin);
