import User from "../../schemas/user.js";
import { ctrlWrapper } from "../../helpers/ctrlWraper.js";

const logOut = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    
    res.status(204).json('No Content');
};

export const logout = ctrlWrapper(logOut);