import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/index.js";
import User from "../models/user.js";
import { configDotenv } from "dotenv";

configDotenv();

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { autorization = "" } = req.headers;
  const [bearer, token] = autorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

export default authenticate;
