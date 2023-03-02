const HttpError = require("../utils/http-error");

const validateBody = schema => {
    const func = (req, res, next) => {
        const {error} = schema.validate(req.body);
        if (error) {
            next(HttpError({status: 400, message: error.message}));
        }
        next();
    }
    return func;
}

module.exports = validateBody;