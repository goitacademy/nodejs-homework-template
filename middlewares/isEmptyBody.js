const { HttpErrors } = require("../helpers");

const isEmptyBody = (req, res, next) => {
    const isEmpty = Object.keys(req.body).length === 0;
    if (isEmpty) {
        next(HttpErrors(400, 'Missing fields'));
    };
    next()
};

module.exports = isEmptyBody;


