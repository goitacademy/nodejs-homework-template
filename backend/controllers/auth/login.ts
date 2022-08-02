import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import createError from "../../helpers/createError";
import User from '../../models/users';

const login = async (req: Request, res: Response) => {
    const { NODE_ENV } = process.env;

    //to check:  Does request contain a password and an email?
    const { password = null, email = null } = req.body;
    if (!password || !email) {
        throw createError({ status: 400, messageProd: "Email or password is missed" });
    }

    //to check: Does the password and the email match the schema?
    const { error } = User.outerSchema.validateUser(req.body);
    if (error) {
        throw createError({ status: 400, messageProd: error.message });
    }

    //to check: Does the email present in the data base?
    const user = await User.model.findOne({ email });
    if (!user) {
        throw createError({
            status: 401,
            messageProd: "Email or password is wrong",
            messageDev: "Dev:Email is not exist in data base",
            nodeEnv: NODE_ENV
        });
    }

    //to check: Is the password valid?
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        throw createError({
            status: 401,
            messageProd: "Email or password is wrong",
            messageDev: "Dev: Invalid password",
            nodeEnv: NODE_ENV
        });
    }

    //token operations
    //to check: Does the SECRET_KEY exist? 
    const { SECRET_KEY } = process.env;
    if (!SECRET_KEY) {
        throw createError({
            status: 500,
            messageDev: "SECRET_KEY is not available",
            nodeEnv: NODE_ENV,
        });
    }
    //to create token
    const payload = {
        id: user._id,
    }
    let token = '';
    try {
        token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
    } catch (error) {
        throw createError({
            status: 500,
            messageDev: "Procedure of token creating is broken",
            nodeEnv: NODE_ENV,
        });
    }
    //to update user's data
    await User.model.findByIdAndUpdate(user._id, { token });

    //to create response
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    })
}

export default login