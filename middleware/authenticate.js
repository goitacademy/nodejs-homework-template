import jwt from "jsonwebtoken";

import authRouter from "../models/user.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;
const { User } = authRouter;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    
    if (bearer !== "Bearer") {
        throw HttpError(401, "Not authorized");
    }
    
    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        // console.log(user);
    if (!user || !user.token) {
      throw HttpError(401, "Not authorized");
    }
          req.user = user;
     next() 
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

export default ctrlWrapper(authenticate);
