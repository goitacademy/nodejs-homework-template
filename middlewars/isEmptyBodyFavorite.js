import HttpError from "../helpers/HttpError.js";

const isEmptyBodyFavorite = (req, res, next) => {
    const keys = Object.keys(req.body);
     if (keys.length === 0) {
        throw HttpError(400, `missing favorite field`); 
    }
    next();
}
export default isEmptyBodyFavorite;