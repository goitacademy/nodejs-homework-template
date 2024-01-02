import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";
import { userSignupSchema, userSigninSchema } from "../models/User.js";
import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
    const { email, password } = req.body;
    
    const { error } = userSignupSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    };

    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.json({
        name: newUser.name,
        email: newUser.email,
    });
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    
    const { error } = userSigninSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    };

    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    };
    
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    };

    const { _id: id } = user;
    const payload = {
        id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });

    res.json({
        token,
    })
}


export default {
    signUp: ctrlWrapper(signUp),
    signIn: ctrlWrapper(signIn),
};