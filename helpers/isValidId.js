const { isValidObjectId } = require("mongoose");
const HttpError = require("./HttpError");

const isValiId = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        const error = HttpError(400, `${contactId} is not corent id format`)
        next(error);
    }
    next();
}

module.exports = isValiId;