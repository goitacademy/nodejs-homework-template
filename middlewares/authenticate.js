import jwt from "jsonwebtoken";

import { HttpError } from "../helpers/HttpError.js";
import { UserModel } from "../schemas/user.js";

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new HttpError(401, "Unauthorized"));
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const user = await UserModel.findById(decodedToken.id);

    if (!user || user.token !== token) {
      return next(new HttpError(401, "Unauthorized"));
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(new HttpError(401, "Unauthorized"));
  }
};


export default authenticate;
