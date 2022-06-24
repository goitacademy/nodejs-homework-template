const { isValidObjectId } = require('mongoose');

const validateId = (req, res, next) => {
    const { id } = req.params;
    if(!isValidObjectId(id)) {
        next({status: 400, message: "Bad id"})
    }
    next();
}

module.exports = {
    validateId
}