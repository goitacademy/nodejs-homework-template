const { HttpError } = require("../helpers");
const contacts = require("../models/contacts");


const validateId = async (req, res, next) => {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (result === null) {
       next(HttpError(404, "Not found"));
    }
    
    next()

}

module.exports = validateId