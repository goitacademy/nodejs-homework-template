import { httpError } from "../helpers/index.js"

const isEmptyBody = (req, res, next) => {
    if (!Object.keys(req.body).length) {
        return next(httpError(400, "All fields empty"));
    }
    next();
}

export default isEmptyBody;