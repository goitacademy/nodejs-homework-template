import { NextFunction, Request, Response } from "express";
import createError from "../../helpers/createError";
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import User, { TUser } from '../../models/users'


type TRequest = Request & { user?: TUser };

const auth = async (req: TRequest, res: Response, next: NextFunction) => {
    console.log("auth test 1");
    try {
        const { SECRET_KEY } = process.env;
        if (!SECRET_KEY) {
            throw createError({ status: 500 });
        }
        console.log("auth test 2");
        const { authorization } = req.headers;
        if (!authorization) {
            throw createError({ status: 401 });
        }
        console.log("auth test 3");
        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw createError({ status: 401 });
        }
        console.log("auth test 4");


        let id = null;
        try {
            const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
            id = decoded.id;
        } catch (error) {
            throw createError({ status: 401 });
        }

        console.log("auth test 5");
        const user: TUser | null = await User.model.findById(id);
        if (!user || !user.token) {
            throw createError({ status: 401 });
        }

        req.user = user;
        console.log("auth test 6");
        next();
    } catch (error) {
        next(error);
    }
}

export default auth;