import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import { UserModel } from "../../schemas/user.js";
import { HttpError } from "../../helpers/HttpError.js";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new HttpError(409, `This ${email} in use`);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

  
    const avatarURL = gravatar(email);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      avatarURL,
    });

    const { subscription } = newUser;
    res.status(201).json({ user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};


const ctrlRegister = ctrlWrapper(register);
export default ctrlRegister;
