const { HttpErrors } = require("../helpers");

const isValidEmail = (req, res, next) => {
    const isEmpty = Object.keys(req.body).length === 0;
    if (isEmpty) {
        next(HttpErrors(400, 'missing required field email'));
    };
    next()
};

module.exports = isValidEmail;
