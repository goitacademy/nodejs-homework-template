const { HttpError } = require('../helpers');



const validateBody = schema => {
    const validateFunc = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, error.message));
        }
        next()
    }
    return validateFunc;
};



module.exports = validateBody;