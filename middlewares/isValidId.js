const {isValidObjectId} = require("mongoose");

const isValidId = (req, res, next)=> {
    const {contactId} = req.params;
    console.log(req.params);
    if(!isValidObjectId(contactId)) {
        return res.status(404).json({"message": `Invalid format of id - ${contactId}`});
    }
    next();
};

module.exports = isValidId;