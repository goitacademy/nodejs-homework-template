import { Request, Response, NextFunction } from "express";
import { TUser } from '../../models/users'

type TController = (req: Request, res: Response) => Promise<void>;
type TRequest = Request & { user?: TUser };

const ctrlTryCatchWrapper = (controller: TController) => {
    const func = async (req: Request | TRequest, res: Response, next: NextFunction) => {
        try {
            await controller(req, res);
        } catch (error) {
            next(error);
        }
    }
    return func;
}

export default ctrlTryCatchWrapper;