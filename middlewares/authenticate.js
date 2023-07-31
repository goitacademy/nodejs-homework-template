import jwt from "jsonwebtoken";
import { ctrlWrapper } from "../decorators/index.js";
import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js";

const { JWt_SECRET } = process.env;

const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") throw HttpError(401, "Not authorized");

  try {
    const { id } = jwt.verify(token, JWt_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) throw HttpError(401);
    req.user = user;
    next();
  } catch {
    throw HttpError(401);
  }
};

export default ctrlWrapper(authenticate);
