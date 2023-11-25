import User from "../models/User.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const signup = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "This email is already exists");
    }

    const newUser = await User.create(req.body);

    res.status(201).json({
        password: newUser.password,
        email: newUser.email,
    })
};

export default {
    signup: ctrlWrapper(signup),
}