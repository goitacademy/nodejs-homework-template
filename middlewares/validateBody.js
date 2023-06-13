const { HttpError } = require("../helpers");

const validateBody = (schema) => {
    const func = (req, res, next) => {
        const {error} = schema.validate(req.body)
        if(error) {
            if (!Object.keys(req.body).length) {
                next(HttpError(400, `missing fields`));
            }
            const [addError] = error.details.map((err) => err.context.label);
            next(HttpError(400, `missing required ${addError} field`));
        } 
        next()
    }
    return func;
}

module.exports = validateBody;