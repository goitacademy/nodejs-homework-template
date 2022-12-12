const { HttpError } = require('../helpers');

const validateParams = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.params.contactId);
        console.log(error)
        if (error) {
            next(HttpError(400, "missing contact's ID"));
        }
        next()
    }
    return func;
}

module.exports = validateParams;