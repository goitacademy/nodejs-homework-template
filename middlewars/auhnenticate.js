import { HttpError } from "../helpers";
import User from "../models/User";
const {SECRET_KEY} = process.env


const authenticate = async (req, res, next) =>
{ const {authorization = ""} = req.headers;
const [bearer, accessToken] = authorization.split("");
if(bearer !== "Bearer") {
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

export default authenticate