const {isObjectIdOrHexString} = require("mongoose");

const {RequestError} = require("../utils");

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    const result = isObjectIdOrHexString(contactId);
    if(!result) {
        next(RequestError(404, `${contactId} is not valid id`))
    }
    next()
}

module.exports = isValidId;