
import { HttpError } from "../helpers/HttpError.js";

export const isEmptyBody = (req, res, next) => {
    const { length } = Object.keys(req.body);
    if (!length) {
        return next(HttpError(400, "missing fiels"))
    }
    next();
}