import { HttpError } from "./HttpErrors.js";

export const validateBody = schema => {
    const func = (req, res, next)=> {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, error.message))
        }
        next(error);
    }

    return func;
}