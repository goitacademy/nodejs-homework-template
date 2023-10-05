import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    throw HttpError(401, "Not authorized, authenticate 1");
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if(!user || !user.token){
        throw HttpError(401, "Not authorized, authenticate 2");
    }
    req.user = user;
    next();
  } 
  catch {
    throw HttpError(401, "Not authorized, authenticate 3");
  }
};

export default ctrlWrapper(authenticate);