import httpError from "../helpers/httpError.js";

const isFavoriteEmpty = (req, res, next) => {
    if (!req.body.favorite) {
        return next(httpError(400, "missing field favorite"))
    }
    next();
}

export default isFavoriteEmpty;