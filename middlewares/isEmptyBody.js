import { HttpError } from '../helpers/HttpError.js';

export const isEmptyBody = async (req, res, next) => {
    const keys = Object.keys(req.body);

    if (keys.length === 0) {
        if (req.method === 'PUT') {
            return next(HttpError(400, "Missing fields"))
        } else if (req.method === 'PATCH') {
            return next(HttpError(400, "Missing field favorite"))
        }
        
    }
    next()
}