import { verify } from "jsonwebtoken";
import User from "../schemas/user.js";
import { HttpError } from "./HttpErrors.js"

import dotenv from 'dotenv';
dotenv.config();

const { SECRET_KEY } = process.env;

export const auth = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(HttpError(401));
    }
    try {
        const { id } = verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
            next(HttpError(401));
        }

        req.user = user;

        next();
    } catch {
        next(HttpError(401));
    }
};