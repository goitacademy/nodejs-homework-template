const { HttpErrors } = require("../helpers");

const isEmptyFieldAvatar = (req, res, next) => {
    if (!req.file) {
        next(HttpErrors(400, `field "avatar" cannot be empty`));
    };
    next()
};

module.exports = isEmptyFieldAvatar;
