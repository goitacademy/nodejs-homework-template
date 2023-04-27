const HttpError = require("../helpers/HttpError");

const validateAddContact = (schema) => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            const value = error.details[0].path[0];

            next(HttpError(400, `missing required ${value} field`));
        }
        next();
    };
    return func;
};

const validateBody = (schema) => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            next(HttpError(400, error.message));
        }
        next();
    };
    return func;
};

const validateRegister = (schema) => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const value = error.details[0];
            const message = value.path[0] === "email" ? "Email must be a valid email" : value.message;
            next(HttpError(400, message));
        }
        next();
    };

    return func;
};

module.exports = { validateAddContact, validateBody, validateRegister };
