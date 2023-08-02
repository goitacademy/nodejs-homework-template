import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  // console.log(authorization);
  const [bearer, token] = authorization.split(" ");
  // console.log(bearer);
  // console.log(token);
  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized 1");
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (
      !user
      // || !user.token
    ) {
      throw HttpError(401, "Not authorized 2");
    }
    // req.user = user;
    next();
  } catch {
    throw HttpError(401, "Not authorized 3");
  }
};

export default ctrlWrapper(authenticate);
