import { NextFunction, Request, Response } from "express";
import createError from "../../helpers/createError";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { TUser } from '../../models/users'


type TRequest = Request & { user?: TUser };

const auth = async (req: TRequest, res: Response, next: NextFunction) => {
    try {
        const { SECRET_KEY } = process.env;
        if (!SECRET_KEY) {
            throw createError({ status: 500 });
        }

        const { authorization } = req.headers;
        if (!authorization) {
            throw createError({ status: 401 });
        }

        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw createError({ status: 401 });
        }

        const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload;
        if (!id) {
            throw createError({ status: 401 });
        }

        const user: TUser | null = await User.model.findById(id);
        if (!user || !user.token) {
            throw createError({ status: 401 });
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

export default auth;