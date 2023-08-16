import HttpError from "../helpers/HttpError.js";

const isEmptyBody = (req, res, next) => {
    const keys = Object.keys(req.body);
     if (keys.length === 0) {
        throw HttpError(400, `missing fields`); 
    }
    next();
}

export default isEmptyBody;