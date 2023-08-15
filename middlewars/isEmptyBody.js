import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
    const { length } = Object.keys(req.body);
    if (!length) {
        next(HttpError(400, 'missing fields'))
    }
    next()
}

export default isEmptyBody;