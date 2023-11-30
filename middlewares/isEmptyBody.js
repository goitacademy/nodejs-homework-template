import { HttpError } from "../helpers/index.js";

const isEmptyBody = async(req, res, next) => {
    const keys = Object.keys(req.body)

    if(!keys.length) {
        return next(HttpError(400, 'missing fields'))
    }

    next()
}

export default isEmptyBody