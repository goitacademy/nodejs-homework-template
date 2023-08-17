const {HttpError} = require("../helpers");

const validateBody = schema => {
    const func = (req, res, next) => {
        if (JSON.stringify(req.body) === '{}') {
            throw HttpError(400, "Missing fields");
        };
        
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, `Missing required ${error.details[0].path} field`));
        };
        next();
    };

    return func;
};

module.exports = validateBody;