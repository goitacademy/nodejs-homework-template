const {HttpError} = require('../helpers');
console.log("HttpError:", HttpError)

const validateBody = schema => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) throw new HttpError(400, error.message)
    next()
}

module.exports = validateBody;