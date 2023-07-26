import User from "../models/user.js";
import { HttpError } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const register = async (req, res) => {
	const newUser = await User.create(req.body);
	res.status(201).json({
		email: newUser.email,
		password: newUser.password,
	});
};
export default {
	register: ctrlWrapper(register),
};
