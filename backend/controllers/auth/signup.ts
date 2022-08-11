import { Request, Response } from "express";
import createError from "../../helpers/createError";
import bscrypt from 'bcrypt';
import User from "../../models/users";
import { TUser } from '../../models/users';
import { TRequestAddUser } from "../../helpers/userTypesTS";
import gravatar from 'gravatar';


const signup = async (req: TRequestAddUser, res: Response) => {
    const { NODE_ENV } = process.env;
    //to check: Is request body exist?    
    if (!req.body) {
        throw createError({ status: 400 });
    }

    //tp check: Does the body's data match the schema?
    const { error }: { error: Error | undefined } = User.outerSchema.validateUser(req.body);
    if (error) {
        throw createError({
            status: 400,
            messageProd: error.message,
        });
    }

    //to check: Is the user with the email exist in data base? 
    const { email, password, subscription = 'starter' }: TUser = req.body;
    const user: TUser | null = await User.model.findOne({ email });
    if (user) {
        throw createError({
            status: 409,
            messageProd: `Email in use`,
            nodeEnv: NODE_ENV
        })
    }

    //to hash password
    const salt = 10;
    const hashPassword = await bscrypt.hash(password, salt);

    const avatarURL = gravatar.url(email);
    //to add user's data to data base
    const result = await User.model.create({ email, password: hashPassword, subscription, avatarURL });
    if (!result) {
        throw createError({
            status: 500
        });
    }

    //to create response
    res.status(201).json({
        user: {
            email,
            subscription,
        }
    });
}

export default signup;