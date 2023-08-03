import { User } from "../models/index.js";
import { HttpError } from "../helpters/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch {
    throw HttpError(401, "Not authorized");
  }
};

export default authenticate;
