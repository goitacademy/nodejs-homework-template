const { isValidObjectId } = require("mongoose");
module.exports = (req, res, next) => {
    if (isValidObjectId(req.params.contactId)) {
        next();
    } else {
        return res.status(400).json({
            code: 400,
            message: "Invalid ID",
        });
    }
};