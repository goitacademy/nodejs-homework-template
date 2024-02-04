import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { HttpError } from "../helpers/HttpError.js";
import { User } from "../models/User.js";

dotenv.config();
const { JWT_SECRET } = process.env;

 const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
        return next(HttpError(401,"Not authorized"))
    }
    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        if (!user || !token ) {
             return next(HttpError(401,"Not authorized"))
        }
        req.user = user;
       return next()
    } catch (error) {
        next(HttpError(401, "Not authorized"))
    }
}
export default authenticate