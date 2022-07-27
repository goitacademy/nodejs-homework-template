import { Request, Response, NextFunction } from "express";
type TController = (req: Request, res: Response) => Promise<void>;

const ctrlTryCatchWrapper = (controller: TController) => {
    const func = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res);
        } catch (error) {
            next(error);
        }
    }
    return func;
}

export default ctrlTryCatchWrapper;