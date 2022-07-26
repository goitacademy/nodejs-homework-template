"use strict"
import {
    Request,
    Response,
    NextFunction
} from 'express';

const verifyAction = async (req: Request, res: Response, next: NextFunction, callback: Function) => {
    try {
        await callback(req, res);
    } catch (error) {
        next(error);
    }
}

export default verifyAction;