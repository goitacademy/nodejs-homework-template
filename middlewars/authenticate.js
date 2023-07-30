import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization="" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        res.status(401).json({message:`Not authorized`});
    }
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        const { id } = payload;
        const user = await User.findById(id);
       
        if (!user || !user.token) {
            res.status(401).json({message:`Not authorized`});
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message:`Not authorized`});
    }

}

export default authenticate;