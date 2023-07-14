const {HttpError} = require("../helpers");

const validateBody = schema => {
    const func = (req, res, next) => {
        if(req.body.favorite === undefined && Object.keys(req.body).length === 0){
            next(HttpError(400, "missing field favorite"));
        }
        if(Object.keys(req.body).length === 0){
            next(HttpError(400, "missing field"));
        }
        const { error } = schema.validate(req.body);
        if(error){
            const fieldName = error.details[0].context.label;
            next(HttpError(400, `missing required ${fieldName} field`));
        }
        next()
    };

    return func;
};

module.exports = validateBody;
