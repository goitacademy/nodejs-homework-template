import { User } from "../models/index.js";
import { HttpError } from '../helpters/index.js';
import { userSchema } from '../schemas/userSchema.js';
import 'dotenv/config';
import bcryptjs from "bcryptjs";

const signup = async(req, res, next) => {
    try{
        const { email, password } = req.body;
        const { error } = userSchema.validate(req.body);

        if (!password || password.length < 6) {
            throw HttpError(400, 'Password must contain at least 6 characters')
        } 

        if (error) {
            throw HttpError(400);
        }

        const user = await User.findOne({ email });

        if (user) {
            throw HttpError(409);
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        const newUser = await User.create({ ...req.body, password: hashPassword });

        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
}

export default {signup,};