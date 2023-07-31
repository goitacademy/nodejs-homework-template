import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import HttpError from "./../helpers/HttpError.js";


dotenv.config();
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = ""} = req.headers;
    console.log(authorization)
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        console.log("first")
        // throw HttpError(401, `Not authorized`);
        res.status(401).json({ message: `Not authorized` });
        return;
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        console.log("second")
        // const { id } = payload;
        const user = await User.findById(id);
       
        if (!user || !user.token) {
             console.log("third")
            // throw HttpError(401, `Not authorized`);
            res.status(401).json({ message: `Not authorized` });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        // throw HttpError(401, `Not authorized`);
        res.status(401).json({ message: `Not authorized` });
        return;
    }

}

export default authenticate;