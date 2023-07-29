import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { HttpError } from "../helpers/index.js";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user || !user.token) {
      next(HttpError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

export default authenticate;
