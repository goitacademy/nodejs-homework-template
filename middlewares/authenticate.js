import jwt from "jsonwebtoken";
import "dotenv/config";
import { HttpError } from "../utils/HttpError.js";
import User from "../models/User.js";
import { controllerWrapper } from "../decorators/controllerWrapper.js";

const { JWT_SECRET } = process.env;

export const authenticate = controllerWrapper(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new HttpError(401, "Authorization header not found");
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw new HttpError(401, "Not authorized");
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || user.token !== token || !user.token) {
      next(new HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch {
    throw new HttpError(401, "Not authorized");
  }
});
