const HttpError = require("../helpers/HttpError");

const isEmptyBody = (req, res, next)=> {
    const {length} = Object.keys(req.body);
    if(!length) {
        next(HttpError(400, "fields must be required"))
    }
    next()
}

module.exports = isEmptyBody;