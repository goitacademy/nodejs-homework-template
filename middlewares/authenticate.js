import jwt from "jsonwebtoken";

import { HttpError } from "../helpers/index.js";

import {ctrlWrapper} from "../decorators/index.js";

import User from "../models/User.js";

const {JWT_SECRET} = process.env;

const authenticate = async(req, res, next)=> {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer") {
        throw HttpError(401, "Not authorized");
    }

    try {
        const {id} = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        if(!user || user.token !== token) {
            throw HttpError(401, "Not authorized");
        }
        req.user = user;
        req.filter = {owner: id}
      
        next();
    }
    catch(error) {
        next(HttpError(401, "Not authorized"));
    }
}

export default ctrlWrapper(authenticate);