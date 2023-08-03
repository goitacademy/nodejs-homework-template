import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!User || !user.token) {
      throw HttpError(401);
    }
    req.user = user;
    next();
  } catch {
    throw HttpError(401);
  }
};

export default ctrlWrapper(authenticate);
