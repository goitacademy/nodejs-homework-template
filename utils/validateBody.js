const {HttpError} = require("../helpers");

const validateBody = schems => {
    const func =(req,res,next) => {
        const {error} = schems.validate(req.body)
        if(error) {
          next(HttpError(400, error.message))
        }
        next()
    }

    return func;
}

module.exports = validateBody;