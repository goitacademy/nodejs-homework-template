const { HttpError } = require('../helpers/');

const errMessage = fieldName => `missing required ${fieldName} field`;

const validated = (shema) => {
    const func = (req, res, next) => {
        const { name, email, phone } = req.body;
        if (!name && !email && !phone) next(HttpError(400, "missing fields"));
        if (!name) next(HttpError(400, errMessage('name')));
        if (!email) next(HttpError(400, errMessage('email')));
        if (!phone) next(HttpError(400, errMessage('phone')));
        const { error } = shema.validate(req.body);
        if (error) next(HttpError(400, error.message));
        next();
    };
    return func;
};

module.exports = validated;