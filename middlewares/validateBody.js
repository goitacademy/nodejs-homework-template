const {HttpError } = require("../helpers");

const validateBody = schema => {
    const func = (rec, res, next) => {
        const {error} = schema.validate(req.body);
        if(error)  {next(HttpError(400, error.message))};
        next()
    }
return func;
} 

module.exports = {
    validateBody,
}