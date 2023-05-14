const { HttpError } = require('../helpers');

const validateBody = (schema) => {
    const func = async (req, res, next) => {
        if (!Object.keys(req.body).length) next(HttpError(400, 'missing fields'));
        const { error } = schema.validate(req.body);
        console.log(schema.validate(req.body).error);
        if (error) {
            next(HttpError(400, error.message))
        }
        next();
    }
    return func;
}

module.exports = validateBody;