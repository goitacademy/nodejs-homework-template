const { RequestError } = require("../helpers");

const validateFavorite = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === undefined) {
        throw RequestError(400, "missing field favorite");
    }
    next();
};

module.exports = validateFavorite;