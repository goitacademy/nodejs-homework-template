const {HttpError} = require("../helpers");

const validateBody = schema => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(new HttpError(422, `${error}`));
        }
        next();
    }
}

module.exports = validateBody;