const { RequestError } = require("../helpers");

const validation = (schema) => {
    return async (req, res, next) => {
        const body = req.body;

        if (Object.keys(body).length === 0) {
            next(RequestError(400, "missing fields"));
        }

        const {error} = schema.validate(body);

        if (error) {
            next(RequestError(400, error.message));
        }

        next();
    };
};

module.exports = validation;
