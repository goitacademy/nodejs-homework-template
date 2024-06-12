const { isValidObjectId } = require("mongoose");
const { errorHttp } = require("../error");

const idValidate = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        next(errorHttp(400, `${contactId} is not valid id`));
    }
    next();
};

module.exports = idValidate;