import { httpError } from "../helpers/index.js";

const validateBodyReq = schema => {
    return async (req, res, next) => {
        const { error } = schema.validate(req.body)
        if (error) {
            return next(httpError(400, error.message));
        }
        next();
    }
}

export default validateBodyReq;