import HttpError from "../helpers/HttpError.js";



 export const validateBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) { console.log("тут помилка")
            return next(HttpError(400, error.message));
        }
        next();
    }

    return func;
}

;