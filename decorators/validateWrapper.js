import { HttpError } from "../helpers/index.js";

const validateWrapper = schema => {
    const wrapFun = async (req, res, next) => {
        const {error} = schema.validate(req.body);
        if (error) {
        throw HttpError(400, error.message)
        }
        next();
    }

    return wrapFun;
}

export default validateWrapper;