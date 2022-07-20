"use strict"
import {
    Request,
    Response,
    NextFunction
} from 'express';

import date from 'moment';
import { appendFile } from 'fs/promises';

export const serverLogger = async (req: Request, res: Response, next: NextFunction) => {
    const { method, url } = req
    const currentDate: string = date().format('YYYY-MM-DD_hh:mm:ss');
    await appendFile('server.log', `${method} ${url} ${currentDate}\n`);
    next();
}
