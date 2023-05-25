const { HttpError } = require('../helpers')

const validateBody = schema => {
    const func = (req, res, next) => {
        if (Object.keys(req.body).length === 0) throw HttpError(400, "Missing fields");
        
        const { error } = schema.validate(req.body);

        if (error) {
            // throw HttpError(400, error.message.replace(/\"/g, ''))
            throw HttpError(400, error.message);
        }

        next();
    }

    return func;
}

module.exports = validateBody;   