import { HttpError } from "../helpers/HttpError.js";

const validateBody = (shema) => {
    const func = async(req, res, next) => {
        const isValidate = shema.validate(req.body);
        if (isValidate.error) {
            return next(HttpError(400, isValidate.error.message))
        }
        next();
    }
    return func
}

export default validateBody