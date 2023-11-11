import { HttpError } from "../helpers/index.js";

const isEmtyBody = async (req, res, next) => {
    const keys = Object.keys(req.body);
    if (!keys.length) {
        return next(HttpError(400, 'Not found'));
    }
    next();
}

export default isEmtyBody;