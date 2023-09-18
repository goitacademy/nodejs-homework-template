import jwt from "jsonwebtoken";

import User from "../models/User.js";

import { HttpErrors } from "../utils/index.js";

import { controllerWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, accessToken] = authorization.split(" ");

  if (bearer !== "Bearer" && accessToken) {
    throw HttpErrors(401);
  }

  try {
    const { id } = jwt.verify(accessToken, JWT_SECRET);

    const user = await User.findById(id);
    if (!user || !user.accessToken) {
      throw HttpErrors(401);
    }
    req.user = user;
    next();
  } catch {
    throw HttpErrors(401);
  }
};

export default controllerWrapper(authenticate);
