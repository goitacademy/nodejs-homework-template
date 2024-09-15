const {isValidObjectId} = require('mongoose');

const UpsErrors = require('../Helpers');

const isValidId = (req, res, next) => {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        next(UpsErrors(400, `${id} is not valid`))
    }
    next();
}

module.exports = isValidId;