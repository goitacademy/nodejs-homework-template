import { HttpError } from "../helpers/index.js";

const validateBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(HttpError(400, error.message));
        }
        next();
    }

    return func;
}

export default validateBody;