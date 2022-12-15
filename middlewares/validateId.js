const { HttpError } = require("../helpers");
const Contact = require("../models/contacts");


const validateId = shema => {
    const func = (req, res, next) => {
        console.log(req.params)
        const { error} = shema.validate(req.params);
        if (error) {
      next(HttpError(400, error.message));
        }
        next()
    }
    return func
}

module.exports = validateId