import { Request, Response } from "express";
import { TUser } from '../../models/users/typesTS';
import createError from '../../helpers/createError'
import { TRequestAddUser } from "../../helpers/userTypesTS";

const getCurrent = async (req: TRequestAddUser, res: Response) => {
    // const getCurrent = async (req: Request & { user?: TUser }, res: Response) => {
    //to check: Does user exist?
    const { NODE_ENV } = process.env;
    if (!req.user) {
        throw createError({
            status: 401,
        })
    }
    //to do response 
    const { email, subscription } = req.user;
    res.status(200).json({
        email,
        subscription
    })
}

export default getCurrent;