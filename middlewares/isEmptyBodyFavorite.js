import { httpError } from "../helpers/index.js"

const isEmptyBodyFavorite = (req, res, next) => {
    if (!Object.keys(req.body).length) {
        return next(httpError(400, "missing field favorite"));
    }
    next();
}

export default isEmptyBodyFavorite;