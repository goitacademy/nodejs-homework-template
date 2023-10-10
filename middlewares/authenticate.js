import jwt from "jsonwebtoken";
// import "dotenv/config";
import { UserDB } from "../models/index.js";
import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  // const { JWT_SECRET } = process.env;
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await UserDB.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

export default authenticate;
