import { HttpError } from "../helpers/index.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [ bearer, token ] = authorization.split(" ");

    if (bearer !== 'Bearer') {
        
        return next(HttpError(401, 'Unauthorized'));
    }
    try {
        const idToken = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(idToken.id);
        if (!user || !user.token || user.token!== token) {
           return next(HttpError(401, 'Unauthorized'));
        }
        req.user = user;
        next();
    } catch(error) {
       return next(HttpError(401, 'Unauthorized'));
    }
}

export default authenticate;