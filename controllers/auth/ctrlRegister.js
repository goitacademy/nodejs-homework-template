import bcrypt from "bcryptjs";
import { UserModel } from "../../schemas/user.js";
import { HttpError } from "../../helpers/HttpError.js";

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new HttpError(409, `This ${email} in use`);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await UserModel.create({ email, password: hashedPassword });

    const { subscription } = newUser;
    res.status(201).json({ user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
const ctrlRegister = ctrlWrapper(register);
export default ctrlRegister;
