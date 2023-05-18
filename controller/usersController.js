import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserById, addNewUser, getUserByMail, updateToken } from "../dataBase/dbQueries.js";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

const userValidationSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .required(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
})

export const signUp = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        Joi.attempt({ email, password }, userValidationSchema);
    } catch (error) {
        return res.status(400)
            .send(error.details[0].message)
    }
    const isUserAlreadyinDB = await getUserByMail(email);

    if (isUserAlreadyinDB) {
        return res.status(409).send("Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 6)
    try {
        const newUser = await addNewUser({ email, password: hashedPassword });
        return res.status(201).json({ user: newUser })
    } catch (error) {
        return res.status(400)
            .send(error)
    }

}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        Joi.attempt({ email, password }, userValidationSchema);
    } catch (error) {
        return res.status(400)
            .send(error.details[0].message)
    }

    const user = await getUserByMail(email);
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!user || !isValidPassword) {
        return res.status(401).send("Email or password is wrong")
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    await updateToken(user._id, token);
    return res.status(201)
        .send(
            {
                "token": token,
                "user":
                {
                    "email": user.email,
                    "subscription": user.subscription
                }
            })
}

export const logout = async (req, res, next) => {
    const userId = req.user._id;
    try {
        await updateToken(userId, null);
        return res.status(204).send("No content")
    } catch (error) {
        return res.status(500)
            .send(error)
    }
}

export const current = async (req, res, next) => {
    const userId = req.user._id;
    try {
        const currentUser = await getUserById(userId);

        if (!currentUser) return res.status(401).json({ "message": "Not authorized" })

        return res.status(200).json({ "email": currentUser.email, "subscription": currentUser.subscription })
    } catch (error) {
        return res.status(500)
            .send(error)
    }
}