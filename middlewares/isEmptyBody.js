const HttpError = require("../helpers/index");

const isEmptyBody = (req, res, next)=> {
    const {length} = Object.keys(req.body);
    if(!length) {
        next(HttpError(400, "fields must be required"))
    }
    next()
}

module.exports = isEmptyBody;