import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
import createError from "../../helpers/createError";
// import TRequest from '../../helpers/userTypesTS'
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { TUser } from '../../models/users'

dotenv.config();
const { SECRET_KEY } = process.env;

type TRequest = Request & { user?: TUser };

const auth = async (req: TRequest, res: Response, next: NextFunction) => {
    try {
        if (!SECRET_KEY) {
            throw createError(503);
        }

        const { authorization } = req.headers;
        if (!authorization) {
            throw createError(401);
        }

        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw createError(401);
        }

        const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload;
        if (!id) {
            throw createError(401);
        }

        const user: TUser | null = await User.model.findById(id);
        if (!user || !user.token) {
            throw createError(401);
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

export default auth;