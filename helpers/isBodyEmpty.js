const HttpError = require('./httpError.js')

const isBodyEmpty = (req, res, next)=> {
    if (!Object.keys(req.body).length) {
        return next(HttpError(400, "All fields empty"));
    }
    next();
}

module.exports = isBodyEmpty;