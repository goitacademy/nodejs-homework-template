import User, { TUser } from "../../models/users"
import { Request, Response } from 'express';
import createError from "../../helpers/createError";

type TRequest = Request & { user?: TUser }

const logout = async (req: TRequest, res: Response) => {
    const { NODE_ENV } = process.env;
    if (!req.user) {
        throw createError({
            status: 401,
            messageDev: "Dev: property 'user' is missed in request ",
            nodeEnv: NODE_ENV,
        })
    }
    const { _id: userId } = req.user;

    await User.model.findByIdAndUpdate(userId, { token: '' })
    res.status(204).send();
}

export default logout;