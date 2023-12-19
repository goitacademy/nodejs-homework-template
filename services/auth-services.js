import User from "../models/User.js";
import { HttpError } from "../utils/HttpError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import "dotenv/config";
import gravatar from "gravatar";


const { JWT_SECRET } = process.env;

const signUpService = async (body) => {
  const user = await User.findOne({
    email: body.email,
  });
  if (user) {
    throw new HttpError(409, "Email in use");
  }

  const hashpassword = await bcrypt.hash(body.password, 10);
  const avatarURL = gravatar.url(body.email);
  const newUser = await User.create({
    ...body,
    password: hashpassword,
     avatarURL,
  });

  return newUser;
};

const logInService = async (body) => {
  const user = await User.findOne({
    email: body.email,
  });
  if (!user) {
    throw new HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email is not verified");
  }
  
  const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  return { token };
};

export default {
  signUpService,
  logInService,
};
