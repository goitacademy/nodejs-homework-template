const { HttpError } = require('../helpers');

const validateBody = schema => {
    const validateFunc = (req, res, next) => {
        if (!Object.keys(req.body).length)
            throw HttpError(400, 'Missing fields!');
        const { error } = schema.validate(req.body);
        if (error) {
            const [details] = error.details;
            next(
                HttpError(400, `Missing required ${details.context.key} field!`)
            );
        }
        next();
    };
    return validateFunc;
};

module.exports = validateBody;
