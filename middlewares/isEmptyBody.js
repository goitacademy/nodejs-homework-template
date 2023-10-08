import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
    const { body } = req;

    if (!body || Object.keys(body).length === 0) {
        return next(HttpError(400, "Request body is empty"));
    }

    next();
};

export default isEmptyBody;