const {HttpError} = require("../helpers");

const isFavoriteEmpty = async(req, res, next)=> {
    if(!req.body || req.body.favorite === undefined) {
        next(HttpError(400, "missing field favorite"))
    }
    next();
};

module.exports = isFavoriteEmpty;