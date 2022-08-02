import { Request, Response } from "express";
import { TUser } from '../../models/users/typesTS';

type TRequest = Request & { user?: TUser }

const getCurrent = (req: TRequest, res: Response) => {
    const { NODE_ENV } = process.env;

}

export default getCurrent;