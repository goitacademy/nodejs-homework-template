import { Request, Response } from "express";
import createError from "../../helpers/createError";
import bscrypt from 'bcrypt';
import User from "../../models/users";
import { TUser } from '../../models/users';

type TRequest = Request & { user?: TUser };

const register = async (req: TRequest, res: Response) => {
    console.log("In register controllers");

    if (!req.body) {
        throw createError(400);
    }
    console.log("In register controllers. Request", req.body);

    const { error } = User.outerSchema.validateUser(req.body);
    console.log("In register controllers. Validation1");
    if (error) {
        throw createError(400);
    }
    console.log("In register controllers. Validation2");

    const { email, password, subscription } = req.body;
    console.log("In register controllers. Destruction body", email);
    if (!email || !password) {
        throw createError(400);
    }
    console.log("In register controllers. Destruction body");

    const user: TUser | null = await User.model.findOne({ email });
    if (user) {
        throw createError(409, `${user} is already exist!`)
    }
    console.log("In register controllers. Verify user existing");

    const hashPassword = await bscrypt.hash(password, 10);
    console.log("In register controllers. pass hashing");

    const result = await User.model.create({ email, password: hashPassword, subscription });

    if (!result) {
        throw createError(500);
    }

    res.status(201).json({
        message: `User with email ${email} have been registered`
    });
}

export default register;