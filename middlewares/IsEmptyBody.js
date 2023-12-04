const { httpError } = require("../helpers");

const isEmptyBody = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        next(httpError(400, 'missing fields'));
    }
    next();
};

 
module.exports = isEmptyBody;
