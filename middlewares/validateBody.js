const {HttpError} = require("../helpers")

const validateBody = schema => {
    const func = (req, res, next)=> {
        const {error} = schema.validate(req.body);
        const numberOfKeys = Object.keys(req.body).length
        if(error) {
            if(numberOfKeys === 0) {
                next(HttpError(400, "missing fields"))
            }
          next(HttpError(400,`missing required ${error.details[0].context.key} field`));
        }
        next()
    }
    return func;
}

module.exports = validateBody;