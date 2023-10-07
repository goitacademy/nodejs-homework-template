import jwt from "jsonwebtoken";
import { UserDB } from "../models/index.js";
import { HttpError } from "../helpers/index.js";

// const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { SECRET_KEY } = process.env;
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
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
