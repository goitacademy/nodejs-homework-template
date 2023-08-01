import HttpError from "../helpers/httpError.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import ctrlWrapper from "../decorators/cntrWrapper.js";


const { JWT_SECRET } = process.env;


const aythenticate = async (req, res, next) => {
   const { authorization = "" } = req.headers;
   const [bearer, token] = authorization.split(' ');
   if (bearer !== 'Bearer') {
      throw HttpError(401);
   }
   try {
      const { id } = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(id);
      if (!user || !user.token)  {
      throw HttpError(401);
      }
      req.user = user;
      next();
   } catch (error) {
      throw HttpError(401, error.message);
   }
}
  
export default ctrlWrapper(aythenticate);