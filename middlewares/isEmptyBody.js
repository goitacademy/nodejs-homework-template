import { HttpError } from "../helpers/index.js"

const isEmptyBody = (req, res, next) => {
    const keys = Object.keys(req.body)
    if (!keys.length) {
        return next(HttpError(400, 'Body must contain fields' ))
    }
    next()
}

export default isEmptyBody