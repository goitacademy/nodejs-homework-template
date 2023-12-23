import bcrypt from "bcryptjs"
import User from "../models/user.js";

import { HttpError } from "../helpers/index.js";

import controllerWrapper from "../decorators/controllerWrapper.js";

const singup = async (req, res) => {
	const { email, password} = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw HttpError(409, "Email in use");
	}

    const hashPassword = await bcrypt.hash(password, 10)

	const newUser = await User.create({...req.body, password: hashPassword});

	res.status(201).json({
		email: newUser.email,
	});
};

const singin = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) {
        throw HttpError(401, "Email wrong")
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare) {
        throw HttpError(401, "Email wrong")
    }

    const token = "ffsdfds"

    res.json({
        token,
    })
}

export default {
	singup: controllerWrapper(singup),
    singin: controllerWrapper(singin)
};
