const HttpError = require("../helpers/HttpError");

const validate = (schema) => {
    const func = (req, res, next) => {
        if (!isEmptyObj(req.body)) {
            const { error } = schema.validate(req.body);
            if (!!error) {
                next(
                    HttpError(
                        400,
                        `Missing required ${error.details[0].path[0]} field`
                    )
                );
            }
            next();
        } else {
            next(HttpError(400, "Missing fields"));
        }
    };
    return func;
};

function isEmptyObj(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}

module.exports = validate;