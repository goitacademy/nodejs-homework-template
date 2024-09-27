const { HttpError } = require("../helpers");

// Валідація данних
const validateBoby = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body); 
        if (error) {
            next(HttpError(400, error.message));
        }
        next();
    }
    return func;
}

module.exports = validateBoby;