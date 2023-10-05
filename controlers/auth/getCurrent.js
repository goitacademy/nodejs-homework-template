import { ctrlWrapper } from "../../helpers/ctrlWraper.js";

const current = async(req, res)=> {
    const {email} = req.user;

    res.json({
        email,
    })
};

export const getCurrent = ctrlWrapper(current);