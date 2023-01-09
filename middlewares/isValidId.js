const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const isValidId = (req, _, next) => {
    const { contactId } = req.params;
    const result = isValidObjectId(contactId);
    if (!result) {
        next(RequestError(400, "Invalid id format"));
    }
    next();
};

module.exports = isValidId;
