import User from "../models/user.js";
import { ctrlWrapper } from "../decorator/index.js";
import { HttpError } from "../helpers/index.js";

const signup = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, 'Email in use')
    }

    const newUser = await User.create(req.body);

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })
}

export default {
    signup: ctrlWrapper(signup),
}