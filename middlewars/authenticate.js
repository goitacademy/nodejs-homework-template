import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
const {SECRET_KEY} = process.env;


const authenticate = async (req, res, next) =>
{ const {authorization = ""} = req.headers;
const [bearer, accessToken] = authorization.split("");
if(bearer !== "Bearer" || !accessToken) {
    throw HttpError(401);
}
try {
    const {id} = jwt.verify(accessToken,SECRET_KEY );
    const user = await User.findById(id)
    if (!user || user.accessToken) { throw HttpError(401);}
    user = req.user;
    next();
}
catch {
    throw HttpError(401);
}
}

export default ctrlWrapper(authenticate);