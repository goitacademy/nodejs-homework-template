import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/index.js";
import "dotenv/config.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import User from "../models/User.js";

const { JWT_SECRET } = process.env;
const errMessage = "Not authorized";

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401, errMessage);
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      throw HttpError(401, errMessage);
    }
    req.user = user;
    next();
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

export default ctrlWrapper(authenticate);
