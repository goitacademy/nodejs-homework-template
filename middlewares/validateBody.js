const { HttpError } = require("../helpers");

const validateBody = shema => {
    const func = (req, res, next) => {
        const { error} = shema.validate(req.body);
        console.log(error)
        if (error) {
      next(HttpError(400, error.message));
        }
        next()
    }
    return func
}
module.exports = validateBody
