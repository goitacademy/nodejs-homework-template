import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  // console.log(authorization);
  const [bearer, token] = authorization.split(" ");
  // console.log(bearer);
  // console.log(token);
  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized");
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch {
    throw HttpError(401, "Not authorized");
  }
};

export default ctrlWrapper(authenticate);
