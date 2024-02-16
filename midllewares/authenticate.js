import HttpError from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrappers.js";
import jwt from 'jsonwebtoken'
import User from "../models/user.js";




const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }
//   const { id } = jwt.verify(token, process.env.JWT_SECRET);
//   const user2 = await User.findById(id);
//   console.log(user2);
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    
    if (!user || !user.token) {
      throw HttpError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    // console.log(error.message);
    next(HttpError(401));
  }
};

export default ctrlWrapper(authenticate);