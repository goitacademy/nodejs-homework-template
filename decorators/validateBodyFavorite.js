const { HttpError } = require("../helpers");

const validateBodyFavorite = (schema) => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(404, "missing field favorite"));
        }
        next();
    };
    return func;
};

module.exports = validateBodyFavorite;